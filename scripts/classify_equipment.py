"""Apply the shared exact equipment list and record auditable data corrections.

Run without arguments for a read-only report; --apply saves the reviewed
classification and its ledger. Raw upstream Markdown and recipe IDs stay intact.
"""
import argparse
import hashlib
import json
from pathlib import Path
import sys
from urllib.parse import unquote

ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT))
from ingredient_rules import classify_recipe, is_equipment
from scripts.expand_recipes import clean


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--apply',action='store_true')
    args=parser.parse_args()
    ledger_path=ROOT/'data/equipment-corrections.json'
    ledger=json.loads(ledger_path.read_text(encoding='utf8')) if ledger_path.exists() else {
        'schema_version':1,'reviewed_on':'2026-10-08',
        'scope':'仅核对设备分类与原文，不代表菜谱完整核验或实际试做。',
        'corrections':[], 'pending':[]}
    previous={(item['recipe_id'],item['original_name']) for item in ledger['corrections']}
    for item in ledger['corrections']:
        source=ROOT/item['source_path'] if item['source_path'] else None
        if source and source.is_file():
            raw=source.read_bytes()
            item['source_checked']=(hashlib.sha256(raw).hexdigest()==item['source_sha256']
                and any(item['original_name'] in clean(line) for line in raw.decode('utf8').splitlines()))
    changes=0
    for filename in ('recipes.json','community-recipes.json','western-recipes.json'):
        path=ROOT/'data'/filename
        if not path.exists():
            continue
        recipes=json.loads(path.read_text(encoding='utf8'))
        updated=[]
        for recipe in recipes:
            result=classify_recipe(recipe)
            if result!=recipe:
                changes+=1
                for item in recipe['ingredients']:
                    if not is_equipment(item['name']) or (recipe['id'],item['name']) in previous:
                        continue
                    url=recipe['source']['url']
                    source_path=''; digest=''; checked=False
                    if 'HowToCook/blob/' in url:
                        relative=unquote(url.split('/blob/',1)[1].split('/',1)[1])
                        source_path='data/upstream/howtocook/'+hashlib.sha256(relative.encode()).hexdigest()[:20]+'.md'
                        source=ROOT/source_path
                        if source.exists():
                            raw=source.read_bytes()
                            digest=hashlib.sha256(raw).hexdigest()
                            checked=any(item['name'] in clean(line) for line in raw.decode('utf8').splitlines())
                    ledger['corrections'].append({'recipe_id':recipe['id'],'recipe_name':recipe['name'],
                        'original_name':item['name'],'change':'ingredients -> equipment',
                        'source_url':url,'source_path':source_path,'source_sha256':digest,
                        'source_checked':checked,'cooking_tested':False})
                    previous.add((recipe['id'],item['name']))
            updated.append(result)
        if args.apply and recipes!=updated:
            path.write_text(json.dumps(updated,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    # Mixed food/equipment lines require an individual editorial split; keep
    # the original text until that review is performed.
    ledger['pending']=[{'recipe_id':r['id'],'original_name':i['name'],
                        'reason':'食材和设备写在同一项，保留原文，待逐项核对。'}
        for r in json.loads((ROOT/'data/community-recipes.json').read_text(encoding='utf8'))
        for i in r['ingredients'] if i['name']=='油 + 锅 + 菜刀 + 铲子']
    if args.apply:
        ledger_path.write_text(json.dumps(ledger,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    print(json.dumps({'changed_recipes':changes,'recorded_corrections':len(ledger['corrections']),
        'source_checked':sum(item['source_checked'] for item in ledger['corrections']),
        'pending':len(ledger['pending']),'applied':args.apply},ensure_ascii=False))


if __name__=='__main__':
    main()
