"""Build a source release from committed Git files; standard library only."""
import argparse
import hashlib
import io
from pathlib import Path, PurePosixPath
import re
import subprocess
import zipfile

ROOT=Path(__file__).resolve().parents[1]


def git(*args):
    return subprocess.check_output(['git',*args],cwd=ROOT)


def main():
    parser=argparse.ArgumentParser(description='Build Shiwei Kitchen source ZIP and SHA-256 checksum.')
    parser.add_argument('--output-dir',type=Path)
    args=parser.parse_args()
    if git('status','--porcelain').strip():
        raise SystemExit('Commit your changes before packaging a release.')
    version=git('show','HEAD:VERSION').decode().strip()
    if not re.fullmatch(r'\d+\.\d+\.\d+',version):
        raise SystemExit('VERSION must use the format 1.0.0.')
    output_dir=(args.output_dir or ROOT/'dist'/f'v{version}').resolve()
    output_dir.mkdir(parents=True,exist_ok=True)
    output=output_dir/f'shiwei-kitchen-v{version}-source.zip'
    checksum=output_dir/'SHA256SUMS.txt'
    if output.exists() or checksum.exists():
        raise SystemExit('Release output already exists; use a new output directory.')
    archive=git('archive','--format=zip','--prefix=shiwei-kitchen/','HEAD')
    entries=[]
    with zipfile.ZipFile(io.BytesIO(archive)) as source:
        for info in source.infolist():
            path=PurePosixPath(info.filename)
            relative=PurePosixPath(*path.parts[1:])
            if '..' in path.parts or path.is_absolute():
                raise SystemExit('Unsafe archive path.')
            if (relative.name.startswith('.env') and relative.name!='.env.example') or relative.suffix in ('.db','.pyc','.log') or any(part in ('.git','.tools','.github-upload','previews','dist','__pycache__') for part in relative.parts) or relative.name.endswith(('.db-shm','.db-wal')):
                raise SystemExit(f'Private or generated file tracked in Git: {relative}')
            data=source.read(info)
            if relative.suffix.lower()=='.bat':
                data=data.replace(b'\r\n',b'\n').replace(b'\n',b'\r\n')
            entries.append((info,data))
    with zipfile.ZipFile(output,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=9) as target:
        for info,data in entries:
            info.compress_type=zipfile.ZIP_DEFLATED
            target.writestr(info,data)
    digest=hashlib.sha256(output.read_bytes()).hexdigest()
    checksum.write_text(f'{digest}  {output.name}\n',encoding='ascii')
    print(f'Created: {output}')
    print(f'Size: {output.stat().st_size:,} bytes')
    print(f'SHA256: {digest}')


if __name__=='__main__':
    main()
