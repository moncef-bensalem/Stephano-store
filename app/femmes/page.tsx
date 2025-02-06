'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";

const produitsFemmes = [
  {
    id: 1,
    nom: "Montre Élégante",
    prix: 45,
    image: "/images/femmes/montre.jpg",
    description: "2 pièces Ensemble de montre de luxe argenté pour femmes, bracelet en acier inoxydable LOVE comme cadeau pour femmes"
  },
  {
    id: 2,
    nom: "Bracelet Or",
    prix: 30,
    image: "/images/femmes/braclet.jpg",
    description: "Set de bracelet et jonc en acier inoxydable vintage élégant avec fleur en zircone, convient pour le port quotidien et la Saint-Valentin pour femmes"
  },
  {
    id: 3,
    nom: "collier court de haute qualité",
    prix: 25,
    image: "/images/femmes/collier.jpg",
    description: "1 pièce Petit pendentif en diamant unique en argent, élégante chaîne de clavicule à verrou en cuivre, collier court de haute qualité,"
  },
  
];

export default function FemmesPage() {
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
      <h1 className="text-4xl font-bold mb-4">Collection Femmes</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Découvrez notre sélection d'accessoires pour femmes
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {produitsFemmes.map((produit) => (
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