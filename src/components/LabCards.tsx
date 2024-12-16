import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { TestTube2, Leaf, Droplets } from "lucide-react";

const labs = [
  {
    id: "soil",
    name: "Soil Testing Lab",
    description: "Comprehensive soil analysis for optimal crop growth",
    icon: TestTube2,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  },
  {
    id: "plant",
    name: "Plant Pathology Lab",
    description: "Diagnose and treat plant diseases effectively",
    icon: Leaf,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  },
  {
    id: "water",
    name: "Water Quality Lab",
    description: "Test water quality for irrigation and farming needs",
    icon: Droplets,
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
  },
];

export const LabCards = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {labs.map((lab) => {
        const Icon = lab.icon;
        return (
          <Card key={lab.id} className="hover:shadow-lg transition-shadow">
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <img
                src={lab.image}
                alt={lab.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Icon className="h-8 w-8 text-primary" />
                <CardTitle className="text-xl">{lab.name}</CardTitle>
              </div>
              <CardDescription>{lab.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full"
                onClick={() => navigate("/book")}
              >
                Book Now
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};