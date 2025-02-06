'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";

const produitsHommes = [
  {
    id: 1,
    nom: "Casquette de baseball",
    prix: 25,
    image: "/images/hommes/casquette.jpg",
    description: "Casquette de baseball en denim unisexe avec lettre brodée, style de rue vintage"
  },
  {
    id: 2,
    nom: " Masque Facial Cagoule",
    prix: 20,
    image: "/images/hommes/cagoul.jpg",
    description: "Cagoule unisexe, masque de visage coupe-vent pour un usage quotidien, "
  },
  {
    id: 3,
    nom: "Sacoche",
    prix: 25,
    image: "/images/hommes/sac.jpg",
    description: "Sac poitrine en velours côtelé de couleur unie, mode et polyvalent."
  },

];

export default function HommesPage() {
    const { addItem } = useCart();
    const { toast } = useToast();
  
    const handleAddToCart = (produit: any) => {
      addItem({
        id: produit.id,
        name: produit.nom,
        price: produit.prix,
        image: produit.image,
      });
  
      toast({
        title: "Produit ajouté !",
        description: `${produit.nom} a été ajouté à votre panier.`,
      });
    };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Collection Hommes</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Découvrez notre sélection d'accessoires pour hommes
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {produitsHommes.map((produit) => (
          <Card key={produit.id}>
            <CardContent className="p-4">
              <div className="relative h-[200px] mb-4">
                <Image
                  src={produit.image}
                  alt={produit.nom}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{produit.nom}</h3>
              <p className="text-muted-foreground mb-3">{produit.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">{produit.prix}DT</span>
                <Button onClick={() => handleAddToCart(produit)}>
                  Ajouter au panier
                </Button>              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}