<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    public function run(): void
    {
        //  Product::factory()->count(20)->create();

        Product::factory()->create([
            'name' => 'King Tut Tutankhamen',
            'description' => 'Hand painted, At the age of nine, King Tut Tutankhamen was crowned pharaoh of Egypt in the year 1332 B.C.',
            'price' => 49.99, 'stock' => 50,
            'image' => 'http://127.0.0.1:8000/images/products_1.png', 'category' => 'paintings',
            'status' => 'in',
        ]);
        Product::factory()->create([
            'name' => 'Nefertiti and Osiris Painting of Ancient Egypt',
            'description' => 'Nefertiti and Isis Before Osiris and Winged Nephthys • Papyrus Painting of Ancient Egypt • Egypt Decor • Handmade Egyptian Paper -17x13 Inch.',
            'price' => 69.99, 'stock' => 50,
            'image' => 'http://127.0.0.1:8000/images/products_2.png', 'category' => 'paintings',
            'status' => 'in',
        ]);
        Product::factory()->create([
            'name' => 'Bronze Figure of Isis with Horus',
            'description' => 'The goddess seated with her feet resting on a square foot-stool and holding her son Horus in her lap, and wearing a long close-fitting dress, bracelets and armlets, broad beaded collar, striated tripartite wig with uraeus, and diadem of uraei surmounted by horns and sun-disk.',
            'price' => 150, 'stock' => 50,
            'image' => 'http://127.0.0.1:8000/images/products_4.jpg', 'category' => 'statues',
            'status' => 'in',
        ]);
        Product::factory()->create([
            'name' => 'An Egyptian Bronze Figure of a Cat',
            'description' => 'Seated alertly on a shaped base with the tail curled around to the forepaws, with erect ears and eyes recessed for inlay, an engraved Eye of Horus amulet suspended on the breast.',
            'price' => 140.70, 'stock' => 50,
            'image' => 'http://127.0.0.1:8000/images/products_5.jpg', 'category' => 'statues',
            'status' => 'out',
        ]);
        Product::factory()->create([
            'name' => 'Fighter - Angie Wright',
            'description' => 'A contemporary painting using bold color juxtaposed against fine art detail. The painting is full of dynamic energy and texture. “Fighter” has been created using strong strokes of oil.',
            'price' => 77.10, 'stock' => 50,
            'image' => 'http://127.0.0.1:8000/images/products_12.png', 'category' => 'nature',
            'status' => 'soon',
        ]);
        Product::factory()->create([
            'name' => 'Blissful Koi - Natalia Nosek',
            'description' => 'Technique: Finest acrylic paints combined with acrylic ink on 4 cm deep canvas, finally finished with neutral, subtle glossy varnish. The painting is ready to hang. The sides are painted in turquoise blue.',
            'price' => 110.50, 'stock' => 50,
            'image' => 'http://127.0.0.1:8000/images/products_11.png', 'category' => 'nature',
            'status' => 'in',
        ]);
        Product::factory()->create([
            'name' => 'Romantic Evening Landscape',
            'description' => 'Expressive painting on which it seems as if the warm light of twilight shines. The stream connects the foreground and background, the sun is about to set on the distant horizon.',
            'price' => 190, 'stock' => 50,
            'image' => 'http://127.0.0.1:8000/images/products_10.png', 'category' => 'nature',
            'status' => 'in',
        ]);
        Product::factory()->create([
            'name' => 'Egyptian goddess ISIS for magic',
            'description' => 'This was crucial to ancient Egyptian religious beliefs. Isis was the sister and wife of the god Osiris, ruler of the underworld. It is said that she and Osiris were in love with each other even in the womb.',
            'price' => 39.99, 'stock' => 50,
            'image' => 'http://127.0.0.1:8000/images/products_9.jpg', 'category' => 'other',
            'status' => 'out',
        ]);
        Product::factory()->create([
            'name' => 'Gorgeous King Tutankhamun Throne',
            'description' => 'Fantastic handmade throne, Imaginatively designed and complements my Barbie - Cleopatra scene perfectly. A real eye-catcher.',
            'price' => 179.99, 'stock' => 50,
            'image' => 'http://127.0.0.1:8000/images/products_8.jpg', 'category' => 'other',
            'status' => 'soon',
        ]);
        Product::factory()->create([
            'name' => 'A Monumental Granite Figure of Sekhmet Enthroned',
            'description' => 'The lion-headed goddess seated against a back pillar with her hands resting by her knees, the right hand open, the left hand holding an ankh, and wearing a long close-fitting dress, broad collar, and striated tripartite wig covering her mane, the stylized whiskers and ruff carved in shallow relief, the high projection behind the head with channel for insertion of the sun-disk and uraeus, her throne carved on each side with block borders and the union of the emblematic plants of Upper and Lower Egypt.',
            'price' => 290, 'stock' => 50,
            'image' => 'http://127.0.0.1:8000/images/products_6.jpg', 'category' => 'statues',
            'status' => 'soon',
        ]);
        Product::factory()->create([
            'name' => 'An Egyptian Polychrome and Gilt Cartonnage Mummy Mask',
            'description' => 'Wearing a broad collar and wig with headband knotted in back and Eye of Horus in relief in front, the stylized hair falling in linked spirals over the forehead, the gilt face with eyes and eyebrows painted black and white, the lappets decorated on the left with a seated figure of Nephthys and on the right with a seated figure of Isis.',
            'price' => 170.20, 'stock' => 50,
            'image' => 'http://127.0.0.1:8000/images/products_7.jpg', 'category' => 'statues',
            'status' => 'in',
        ]);
        Product::factory()->create([
            'name' => 'Prince of Egypt Authentic Egyptian Hand Painted',
            'description' => 'This lovely artwork by Adel Ghabour depicts a portion of the "Beautiful celebration of the valley" picture that may be seen on the tomb walls of Nakht, High Quality Certified Original Authentic Papyrus Paper.',
            'price' => 55, 'stock' => 50,
            'image' => 'http://127.0.0.1:8000/images/products_3.png', 'category' => 'paintings',
            'status' => 'out',
        ]);
    }
}
