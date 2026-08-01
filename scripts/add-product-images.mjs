import fs from "fs";

const path = "data/catalog.json";
const catalog = JSON.parse(fs.readFileSync(path, "utf8"));

const u = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=240&h=240&q=80`;

const byKeyword = [
  [/taaza|milk shake|whitener|\bmilk\b/i, u("photo-1563636619-e9143da7973b")],
  [/butter(?!scotch)/i, u("photo-1589985270826-4b7bb135bc9d")],
  [/curd|yogurt|yoghurt/i, u("photo-1488477181946-6428a0291777")],
  [/cheese/i, u("photo-1486297678162-eb2a19b0a32d")],
  [/paneer/i, u("photo-1631452180519-c014fe946bc7")],
  [/banana/i, u("photo-1571771894821-ce9b6c11b08e")],
  [/apple/i, u("photo-1560806887-1e4cd0b6cbd6")],
  [/mango/i, u("photo-1553279768-865429fa0078")],
  [/pomegranate/i, u("photo-1541344999734-4f79bd494ef9")],
  [/tomato/i, u("photo-1546094096-0df4bcaaa337")],
  [/onion/i, u("photo-1508747703725-719777637510")],
  [/potato/i, u("photo-1518977676601-b53f82aba655")],
  [/coriander/i, u("photo-1615485290382-441e4d049cb5")],
  [/egg/i, u("photo-1582722872445-44dc5f7e3c8f")],
  [/bread|pav|bun|multigrain/i, u("photo-1509440159596-0249088772ff")],
  [/atta|flour/i, u("photo-1574323347407-f5e1ad6d020b")],
  [/basmati|rice/i, u("photo-1586201375761-83865001e31c")],
  [/oil|sunflower/i, u("photo-1474979266404-7eaacbcd87c5")],
  [/dal|toor/i, u("photo-1596797038530-2c107229654b")],
  [/salt/i, u("photo-1518110925495-5fe2fda0442c")],
  [/maggi|noodle/i, u("photo-1612929633738-8fe44f7ec841")],
  [/tea/i, u("photo-1556679343-c7306c1976bc")],
  [/sugar/i, u("photo-1587049352846-4a222e784d38")],
  [/lay'?s|chipps|chips|bingo|kurkure|mixture|popcorn|bourbon|parle/i, u("photo-1566478989037-eec170784d0b")],
  [/ice cream|cornetto|choco bar|cassata|scoop|butterscotch|magnum|rajbhog|vanilla cup/i, u("photo-1563805042-7684c019e1cb")],
  [/crocin|dolo|cetirizine|benadryl|strepsils|volini|digene|vicks/i, u("photo-1584308666744-24d5c474f2ae")],
  [/pedigree|drools|dog chew|\bdog\b/i, u("photo-1587300003388-59208cc962cb")],
  [/whiskas|me-o|cat litter|kitten|\bcat\b/i, u("photo-1574158622682-e40e69881006")],
  [/collar|pet shampoo|\bpet\b/i, u("photo-1601758228041-f3b2795255f1")],
  [/pampers|huggies|diaper|pants|baby soap|baby lotion|cerelac|baby wipes|\bbaby\b/i, u("photo-1515488042361-ee00e0ddd4e4")],
  [/harpic|lizol|domex|colin|vim|surf|scotch|hit/i, u("photo-1563453392212-326f5e854473")],
];

const overrides = {
  "Amul Taaza 1L": u("photo-1563636619-e9143da7973b"),
  "Amul Butter 100g": u("photo-1589985270826-4b7bb135bc9d"),
  "Mother Dairy Curd 400g": u("photo-1628088062854-d1870b4553da"),
  "Amul Cheese Slices": u("photo-1486297678162-eb2a19b0a32d"),
  "Nestle Everyday Dairy Whitener": u("photo-1550583724-b2692b85b150"),
  "Epigamia Greek Yogurt": u("photo-1488477181946-6428a0291777"),
  "Amul Paneer 200g": u("photo-1631452180519-c014fe946bc7"),
  "Amul Milk Shake Chocolate": u("photo-1572490122747-3968b75cc699"),
  "Banana Robusta (6)": u("photo-1571771894821-ce9b6c11b08e"),
  "Shimla Apple (4)": u("photo-1560806887-1e4cd0b6cbd6"),
  "Alphonso Mango (2)": u("photo-1553279768-865429fa0078"),
  "Pomegranate (2)": u("photo-1541344999734-4f79bd494ef9"),
  "Tomato Local 500g": u("photo-1546094096-0df4bcaaa337"),
  "Onion 1kg": u("photo-1508747703725-719777637510"),
  "Potato 1kg": u("photo-1518977676601-b53f82aba655"),
  "Coriander Bunch": u("photo-1615485290382-441e4d049cb5"),
  "Farm Fresh Eggs (6)": u("photo-1582722872445-44dc5f7e3c8f"),
  "Eggs Cage Free (12)": u("photo-1518569656558-1f25e69d93d7"),
  "Britannia Brown Bread": u("photo-1509440159596-0249088772ff"),
  "English Oven Multigrain": u("photo-1549931319-a545dcf3bc73"),
  "Modern White Bread": u("photo-1598373182133-52452f7691ef"),
  "Pav Bun Pack (6)": u("photo-1608198093002-ad4e005484ec"),
  "Aashirvaad Atta 5kg": u("photo-1574323347407-f5e1ad6d020b"),
  "India Gate Basmati 1kg": u("photo-1586201375761-83865001e31c"),
  "Fortune Sunflower Oil 1L": u("photo-1474979266404-7eaacbcd87c5"),
  "Tata Sampann Toor Dal 1kg": u("photo-1596797038530-2c107229654b"),
  "Tata Salt 1kg": u("photo-1518110925495-5fe2fda0442c"),
  "Maggi 2-Minute Noodles": u("photo-1612929633738-8fe44f7ec841"),
  "Tata Tea Gold 250g": u("photo-1556679343-c7306c1976bc"),
  "Sugar Free Flow 100g": u("photo-1587049352846-4a222e784d38"),
  "Lay's India's Magic Masala": u("photo-1566478989037-eec170784d0b"),
  "Kurkure Masala Munch": u("photo-1621939514649-280e2ee25f60"),
  "Haldiram's Mixture": u("photo-1601050690597-df0568f70950"),
  "Bingo Mad Angles": u("photo-1599490659213-e2b9527bd087"),
  "Act II Butter Popcorn": u("photo-1578849278619-e73505e9610f"),
  "Britannia Bourbon Pack": u("photo-1558961363-fa8fdf82db35"),
  "Parle-G Gluco Biscuits": u("photo-1558961363-fa8fdf82db35"),
  "Uncle Chipps Spicy Treat": u("photo-1613919113640-25732ec5d86f"),
  "Amul Vanilla Cup": u("photo-1563805042-7684c019e1cb"),
  "Kwality Walls Cornetto": u("photo-1501443762994-82bd5dace89a"),
  "Mother Dairy Choco Bar": u("photo-1488900124595-978c2e75c7fd"),
  "Havmor Cassata Slice": u("photo-1567206563064-6f60f40a2b57"),
  "Baskin Robbins Scoop Pack": u("photo-1497034823373-d963a89f4e1c"),
  "Amul Butterscotch Tub 500ml": u("photo-1563805042-7684c019e1cb"),
  "Magnum Almond": u("photo-1497034823373-d963a89f4e1c"),
  "Vadilal Rajbhog Cup": u("photo-1501443762994-82bd5dace89a"),
  "Crocin Advance Strip": u("photo-1584308666744-24d5c474f2ae"),
  "Dolo 650 Strip": u("photo-1471867245382-b1e3b3bf407d"),
  "Vicks VapoRub 25ml": u("photo-1631549916768-4119b2e5f926"),
  "Benadryl Cough Syrup": u("photo-1587854692152-cbe660dbde88"),
  "Strepsils Honey Lemon": u("photo-1550572017-edd951aa8f72"),
  "Cetirizine 10mg Strip": u("photo-1584308666744-24d5c474f2ae"),
  "Volini Gel 30g": u("photo-1556228720-195a672e8a03"),
  "Digene Gel Mint": u("photo-1631549916768-4119b2e5f926"),
  "Pedigree Adult 1kg": u("photo-1587300003388-59208cc962cb"),
  "Whiskas Tuna Pouch": u("photo-1574158622682-e40e69881006"),
  "Drools Chicken & Egg 1kg": u("photo-1548199973-03cce0bbc87b"),
  "Pet Collar Adjustable": u("photo-1601758228041-f3b2795255f1"),
  "Cat Litter 5kg": u("photo-1574158622682-e40e69881006"),
  "Dog Chew Bone Pack": u("photo-1530281700549-e82e7bf110d6"),
  "Me-O Kitten Food 450g": u("photo-1514888286974-6c03e2ca1dba"),
  "Pet Shampoo 200ml": u("photo-1601758228041-f3b2795255f1"),
  "Pampers Baby Dry S (20)": u("photo-1515488042361-ee00e0ddd4e4"),
  "Huggies Wonder Pants M": u("photo-1515488042361-ee00e0ddd4e4"),
  "Johnson's Baby Soap": u("photo-1556228578-0d85b1a4d571"),
  "Himalaya Baby Lotion 200ml": u("photo-1556228720-195a672e8a03"),
  "Cerelac Wheat Apple 300g": u("photo-1544367567-0f2fcb009e0b"),
  "Baby Wipes Soft Pack": u("photo-1515488042361-ee00e0ddd4e4"),
  "Harpic Power Plus 1L": u("photo-1585421514738-01798e348b17"),
  "Lizol Disinfectant 975ml": u("photo-1563453392212-326f5e854473"),
  "Vim Dishwash Gel 750ml": u("photo-1563453392212-326f5e854473"),
  "Surf Excel Matic 1kg": u("photo-1610557892470-55d9e80c0bce"),
  "Colin Glass Cleaner 500ml": u("photo-1628177142898-93e36e4e3a50"),
  "Scotch-Brite Scrub Pad (3)": u("photo-1581578731548-c64695cc6952"),
  "Domex Floor Cleaner 1L": u("photo-1585421514738-01798e348b17"),
  "Hit Flying Insect Killer": u("photo-1628177142898-93e36e4e3a50"),
};

const categoryFallback = {
  Dairy: u("photo-1628088062854-d1870b4553da"),
  "Fruits & vegetables": u("photo-1610832958506-aa56368176cf"),
  "Bread & eggs": u("photo-1509440159596-0249088772ff"),
  Staples: u("photo-1586201375761-83865001e31c"),
  Snacks: u("photo-1566478989037-eec170784d0b"),
  "Ice cream": u("photo-1563805042-7684c019e1cb"),
  Pharmacy: u("photo-1584308666744-24d5c474f2ae"),
  "Pet supplies": u("photo-1587300003388-59208cc962cb"),
  "Baby care": u("photo-1515488042361-ee00e0ddd4e4"),
  "Home cleaning": u("photo-1563453392212-326f5e854473"),
};

for (const p of catalog.products) {
  let image = overrides[p.name];
  if (!image) {
    const hit = byKeyword.find(
      ([re]) => re.test(p.name) || p.tags.some((t) => re.test(t)),
    );
    image = hit ? hit[1] : categoryFallback[p.category];
  }
  p.image = image;
  delete p.emoji;
}

fs.writeFileSync(path, JSON.stringify(catalog, null, 2) + "\n");
console.log("updated", catalog.products.length);
console.log(
  "missing",
  catalog.products.filter((p) => !p.image).map((p) => p.name),
);
