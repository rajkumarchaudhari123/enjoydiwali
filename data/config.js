// ✏️ YAHAN EDIT KARO — shop details aur products
export const SHOP = {
  name: "Enjoy Your Diwali",
  phone: "919667048566", // country code 91 + number
  tagline: "Crackers aur fresh phool, seedha aapke ghar tak.",
};
// [English name, Hindi name, icon type, color, price (optional, e.g. 120)]
// Price likhoge to "Rate coming soon" ki jagah ₹price dikhega.
const mk = (p, a) => a.map(([name, hi, type, color, price], i) => ({ id: p + i, name, hi, type, color, price }));
export const CRACKERS = mk("c", [
  ["Sparklers", "Phuljhadi", "spark", "#FFB627"],
  ["Flower Pot", "Anar", "anar", "#FF6B2C"],
  ["Ground Chakri", "Chakri", "chakri", "#E0457B"],
  ["Sky Rocket", "Rocket", "rocket", "#E0457B"],
  ["Whistling Rocket", "Seeti Rocket", "rocket", "#4FC3F7"],
  ["5 Shot Multicolor", "Sky Shot", "rocket", "#9B5DE5"],
  ["Twinkling Star", "Taare", "spark", "#FFD166"],
  ["Magic Pencil", "Jadui Pencil", "spark", "#06D6A0"],
  ["Color Matches", "Rangeen Teeli", "spark", "#FF6B2C"],
  ["Fancy Fountain", "Fawwara", "anar", "#06D6A0"],
  ["Bijli Crackers", "Bijli", "bomb", "#E0457B"],
  ["Snake Tablets", "Saanp Goli", "bomb", "#8D99AE"],
  ["Pop Pop", "Pop Pop", "bomb", "#FFD166"],
  ["Hydro Bomb", "Hydro", "bomb", "#4FC3F7"],
  ["Garland 1000 Wala", "Laddi", "ladi", "#FF6B2C"],
  ["Colour Smoke", "Rangeen Dhuan", "anar", "#9B5DE5"],
]);
export const FLOWERS = mk("f", [
  ["Marigold Garland", "Genda Mala", "flower", "#FFB627"],
  ["Rose Bouquet", "Gulab Guldasta", "flower", "#E0457B"],
  ["Jasmine Gajra", "Mogra Gajra", "flower", "#FFF4E0"],
  ["Lotus", "Kamal", "flower", "#F78FB3"],
  ["Rangoli Petals", "Rangoli Phool", "flower", "#FF6B2C"],
  ["Puja Flower Mix", "Puja Phool", "flower", "#FFD166"],
]);
