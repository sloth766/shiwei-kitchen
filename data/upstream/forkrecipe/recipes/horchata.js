export default {
  repoId: "master_mexican_horchata_001",
  parentRepoId: null,
  slug: "horchata",
  author: "ForkRecipe Kitchen",

  title: "Mexican Horchata",
  description: "A cold, milky-white drink made by soaking rice overnight with cinnamon and then blending it into a slightly grainy, sweet water that is one of the most soothing things a hot afternoon can offer — starchy, gently spiced, and fragrant with a vanilla-adjacent warmth that has nothing to do with dairy and everything to do with rice and time.",
  cuisine: "Mexican",
  culture: "Mexican agua fresca tradition",
  category: "beverages",

  tags: ["mexican", "horchata", "rice", "cinnamon", "drink", "cold", "vegan", "agua-fresca"],
  difficulty: 1,
  activeTime: "15 min",
  totalTime: "8 hr 15 min",
  ratioSystem: "parts",

  stars: 0,
  forks: 0,
  contributors: 1,
  license: "CC-BY-SA",
  createdAt: "2026-06-28",
  updatedAt: "2026-06-28",

  flavorRadar: { sweet: 4, salty: 0, sour: 0, bitter: 0, umami: 0, heat: 1 },

  ingredients: [
    { ingId: "ing_01", role: "Starch",    name: "Long-grain white rice, uncooked, unrinsed", ratioValue: 1, defaultUnit: "parts", substitutions: ["blanched almonds (classic Spanish version)", "tiger nuts (original Valencian horchata)"] },
    { ingId: "ing_02", role: "Liquid",    name: "Cold water (for soaking)", ratioValue: 4, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_03", role: "Spice",     name: "Mexican cinnamon sticks (canela, Ceylon-type — not cassia)", ratioValue: 0.1, defaultUnit: "parts", substitutions: ["cassia cinnamon (stronger, more assertive)"] },
    { ingId: "ing_04", role: "Sweetener", name: "Caster sugar or piloncillo (raw cane sugar cone)", ratioValue: 0.3, defaultUnit: "parts", substitutions: ["agave nectar", "honey"] },
    { ingId: "ing_05", role: "Aromatic",  name: "Pure vanilla extract", ratioValue: 0.01, defaultUnit: "parts", substitutions: ["vanilla bean, split and added during soak"] },
    { ingId: "ing_06", role: "Liquid",    name: "Additional cold water (for blending and diluting)", ratioValue: 2, defaultUnit: "parts", substitutions: [] },
    { ingId: "ing_07", role: "Dairy",     name: "Whole milk or evaporated milk (optional, for a creamier horchata)", ratioValue: 1, defaultUnit: "parts (optional)", substitutions: ["oat milk", "coconut milk"] },
  ],

  processNodes: [
    {
      nodeId: "step_1",
      action: "Steep",
      inputs: ["ing_01", "ing_02", "ing_03"],
      outputState: "soaked_rice",
      instructions: "Combine the uncooked, unrinsed rice and cinnamon sticks in a large bowl or jar. The rice is left unrinsed intentionally — the surface starch on the grains is what gives horchata its characteristic milky, slightly thick texture. If you rinsed the rice, you would wash away the starch that makes horchata different from simple rice water. Pour the cold water over the rice and cinnamon, making sure all the rice is submerged. Cover and refrigerate for a minimum of 8 hours, ideally overnight (up to 16 hours). During this soak, the rice absorbs water and begins to swell and soften, and the cinnamon slowly infuses its volatile oils into the water. After 8 hours, the water will be faintly opaque and smell warmly of cinnamon. Do not soak longer than 16 hours — the rice can begin to ferment slightly, giving an off, sour note.",
      visualCue: {
        primaryTarget: "The soaking water has turned from clear to a faintly opaque, pale milky colour. The rice grains have swelled visibly — plumper and more bloated than before. The cinnamon sticks have darkened and unfurled slightly.",
        spectrum: [
          { state: "Underdone", description: "Water is still clear and the rice grains look unchanged. Only 2–3 hours have passed. The cinnamon aroma is faint.", action: "Return to the fridge. The soak is not complete — the rice has not softened enough to blend smoothly." },
          { state: "Perfect",   description: "Opaque, pale milky water with a distinct cinnamon aroma. Rice grains are visibly swollen and some have begun to crack slightly. Easy to crush between fingers.", action: "Proceed to blending." },
          { state: "Overdone",  description: "Water is quite opaque and smells faintly sour in addition to the cinnamon. The rice has been soaking more than 16 hours and fermentation has started.", action: "Use immediately, blending and straining quickly. The slight sourness may be imperceptible after sweetening, but it is best to avoid this." },
        ],
      },
      feelCue: "Pick up a soaked rice grain and press it between your thumbnail and forefinger — it should crush easily with a gentle squeeze, offering almost no resistance. That tenderness means the grain will blend smoothly into the water rather than leaving gritty particles.",
    },
    {
      nodeId: "step_2",
      action: "Blend",
      inputs: ["soaked_rice", "ing_06"],
      outputState: "blended_rice_water",
      instructions: "Remove the cinnamon sticks from the soaked rice (they have done their work). Pour the rice and all its soaking water into a blender. Add the additional cold water. Blend on high speed for a full 2 minutes — this is longer than you think necessary, but thorough blending is what determines whether your horchata is smooth or gritty. The mixture will turn from opaque milky to a thick, whitish suspension that looks like very thin oatmeal. Do not stop blending early. After 2 minutes, the rice should be completely broken down into a fine powder suspended in water. If your blender is not powerful, blend in 30-second bursts with a rest in between to prevent the motor overheating. The blended mixture will smell powerfully of rice and cinnamon together — a warm, starchy, comforting smell.",
      visualCue: {
        primaryTarget: "A uniformly white, opaque, slightly thick liquid that looks like thin oat milk. No visible rice chunks. The mixture pours smoothly with a very fine, barely perceptible graininess.",
        spectrum: [
          { state: "Underdone", description: "Visible rice pieces still float in the liquid. The mixture looks chunky and uneven. Less than 60 seconds of blending.", action: "Continue blending on high for another full minute. The blending time genuinely matters here." },
          { state: "Perfect",   description: "Uniformly white, opaque, smooth-poured liquid. No visible chunks. The smell is sweet-starchy and strongly cinnamony. Pours like thin oat milk.", action: "Strain through a fine-mesh sieve or cheesecloth immediately." },
          { state: "Overdone",  description: "You cannot over-blend at this stage — more blending is always better for texture.", action: "Proceed to straining." },
        ],
      },
      feelCue: "Rub a drop of the blended liquid between your fingers — it should feel silky with a very slight, powdery graininess, like fine rice flour suspended in water. That texture tells you the rice has been broken down fine enough for a good final product.",
    },
    {
      nodeId: "step_3",
      action: "Strain",
      inputs: ["blended_rice_water"],
      outputState: "strained_horchata_base",
      instructions: "Line a fine-mesh sieve with a double layer of cheesecloth, or use a nut milk bag. Pour the blended mixture through in batches, pressing and squeezing the solids firmly to extract all liquid. The solids that remain (the rice pulp) can be dried and used as rice flour, composted, or added to smoothies — do not discard them carelessly. What pours through will be a smooth, pure white liquid. The degree of straining determines the texture of the final drink: through cheesecloth it will be completely smooth and silky; through just a mesh sieve it will have a slight, authentic graininess that many traditional horchatas retain. Taste the strained liquid: it should be lightly sweet from the rice starch, warm from the cinnamon, and have a clean, slightly chalky finish — unflavoured and in need of sugar and vanilla.",
      visualCue: {
        primaryTarget: "A pure white, opaque liquid that flows smoothly through the sieve. The solids left behind are pale, almost dry rice pulp.",
        spectrum: [
          { state: "Underdone", description: "Large amounts of liquid still trapped in the solids. You have not pressed and squeezed enough.", action: "Press down hard on the solids in the sieve. Gather the cheesecloth into a ball and squeeze firmly to extract maximum liquid." },
          { state: "Perfect",   description: "The liquid flows freely and the solids are pressed almost dry. The strained horchata is pure white and pours smoothly.", action: "Add sugar, vanilla, and optional milk in the final step." },
          { state: "Overdone",  description: "You have squeezed so hard that starchy solids are passing through the cloth, making the drink gritty.", action: "Strain again through a fresh layer of cheesecloth." },
        ],
      },
      feelCue: "The strained liquid should feel smooth on the lip of the bowl as it runs — not gritty, not sticky, but clean and slightly starchy, like water that has memory of something once dissolved in it.",
    },
    {
      nodeId: "step_4",
      action: "Season",
      inputs: ["strained_horchata_base", "ing_04", "ing_05", "ing_07"],
      outputState: "finished_horchata",
      instructions: "Add the sugar to the strained horchata base and stir until fully dissolved — if using piloncillo, grate it finely first or dissolve it in a small amount of warm water before adding. Add the vanilla extract. If using milk or evaporated milk, stir it in now — the evaporated milk version is richer and more indulgent, closer to a horchata con leche from a taqueria counter. Taste carefully: the horchata should be sweet but not cloying, with a warm cinnamon background, a slight rice starchiness, and a vanilla note that rounds the edges. Adjust sugar to taste. Refrigerate for at least 1 hour before serving — horchata tastes profoundly better cold. Serve over plenty of ice in tall glasses with a dusting of ground cinnamon on top. It keeps for 3 days refrigerated — stir well before each serving as the starch settles.",
      visualCue: {
        primaryTarget: "A pure white, cold, lightly frothy drink that looks like milk but has a slightly thinner body. When poured over ice it should be opaque and clean white.",
        spectrum: [
          { state: "Underdone", description: "The sugar has not dissolved fully — you can see and taste granules. The vanilla is absent or too faint.", action: "Stir more vigorously. Warm slightly (do not boil) if the sugar is resistant, then chill before serving." },
          { state: "Perfect",   description: "Completely smooth, sweet, cold, white drink. The cinnamon is a warmth in the background, not dominant. The rice starch gives a barely perceptible body. Clean, refreshing finish.", action: "Serve immediately over ice with a cinnamon dusting." },
          { state: "Overdone",  description: "The horchata is too sweet — it coats the mouth and the cinnamon is lost under the sugar.", action: "Dilute with cold water, a splash at a time. Add a squeeze of lime juice to re-balance." },
        ],
      },
      feelCue: "Take a sip — the first sensation should be cold and clean, like water, then the sweetness arrives, then a lingering warmth of cinnamon at the back of the throat. It should feel lighter than milk in the mouth, but with more body than plain water — that rice-starch middle ground is the whole point.",
    },
  ],
};
