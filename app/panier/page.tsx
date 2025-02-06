"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import emailjs from '@emailjs/browser';
import { emailjsConfig } from "@/lib/emailjs";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    firstName: "",
    phone: "",
    address: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const orderDetails = items.map(item => 
        `${item.name} (${item.quantity}x) - ${item.price * item.quantity}DT`
      ).join('\n');
  
      // Mise à jour des templateParams pour correspondre à votre template
      const templateParams = {
        from_name: `${formData.firstName} ${formData.name}`,
        nom: formData.name,
        prenom: formData.firstName,
        telephone: formData.phone,
        adresse: formData.address,
        produits: orderDetails,  // Ajout d'un champ spécifique pour les produits
  total: `${total}DT`,     // Ajout d'un champ spécifique pour le total
        // Vous pouvez ajouter un champ pour les détails de la commande si nécessaire
        message: `Détails de la commande:\n${orderDetails}\nTotal: ${total}DT`,
      };
  
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams,
        emailjsConfig.publicKey
      );
  
      toast({
        title: "Commande envoyée !",
        description: "Nous vous contacterons bientôt pour confirmer votre commande.",
      });
  
      clearCart();
      setFormData({
        name: "",
        firstName: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de la commande.",
        variant: "destructive",
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
        <p className="text-muted-foreground mb-8">
          Découvrez nos produits et ajoutez-les à votre panier
        </p>
        <Button asChild>
          <a href="/">Retour à la boutique</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Votre Panier</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {items.map((item) => (
            <Card key={item.id} className="mb-4">
              <CardContent className="flex items-center gap-4 p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-muted-foreground">{item.price}DT</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="font-semibold">
                  {(item.price * item.quantity).toFixed(2)}DT
                </p>
              </CardContent>
            </Card>
          ))}
          <div className="text-right mt-4">
            <p className="text-xl font-bold">Total: {total.toFixed(2)}DT</p>
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Informations de livraison</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Commander
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}