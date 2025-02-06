import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: "hommes",
    title: "Hommes",
    image: "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?q=80&w=1000",
    description: "Accessoires élégants pour hommes"
  },
  {
    id: "femmes",
    title: "Femmes",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000",
    description: "Accessoires raffinés pour femmes"
  }
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Bienvenue chez Stephano-Store</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Découvrez notre collection exclusive d'accessoires de mode
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-[400px]">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-6">
                  <h2 className="text-3xl font-bold mb-2">{category.title}</h2>
                  <p className="mb-4 text-lg">{category.description}</p>
                  <Link href={`/${category.id}`}>
                    <Button variant="secondary" size="lg">
                      Découvrir
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Pourquoi nous choisir ?</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Qualité Premium</h3>
            <p className="text-muted-foreground">
              Des accessoires soigneusement sélectionnés pour leur qualité exceptionnelle
            </p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Livraison Rapide</h3>
            <p className="text-muted-foreground">
              Recevez vos commandes rapidement et en toute sécurité
            </p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Service Client</h3>
            <p className="text-muted-foreground">
              Une équipe à votre écoute pour vous accompagner dans vos achats
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}