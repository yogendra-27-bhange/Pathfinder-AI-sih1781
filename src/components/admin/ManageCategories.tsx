
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase"; // Import Firestore instance
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";

interface Category {
  id: string;
  name: string;
}

export default function ManageCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const categoriesCollectionRef = collection(db, "careerCategories");

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const q = query(categoriesCollectionRef, orderBy("name"));
        const data = await getDocs(q);
        const fetchedCategories: Category[] = data.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setCategories(fetchedCategories);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please ensure Firebase is configured correctly and you have internet access.");
        toast({ title: "Error", description: "Could not load categories.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (newCategory.trim() === "") {
      toast({ title: "Error", description: "Category name cannot be empty.", variant: "destructive" });
      return;
    }
    if (categories.some(cat => cat.name.toLowerCase() === newCategory.trim().toLowerCase())) {
      toast({ title: "Error", description: "Category already exists.", variant: "destructive" });
      return;
    }
    try {
      const docRef = await addDoc(categoriesCollectionRef, { name: newCategory.trim() });
      setCategories(prev => [...prev, { id: docRef.id, name: newCategory.trim() }].sort((a,b) => a.name.localeCompare(b.name)));
      toast({ title: "Success", description: `Category "${newCategory.trim()}" added.` });
      setNewCategory("");
    } catch (err) {
      console.error("Error adding category:", err);
      toast({ title: "Error", description: "Could not add category.", variant: "destructive" });
    }
  };

  const handleDeleteCategory = async (categoryToDelete: Category) => {
    try {
      await deleteDoc(doc(db, "careerCategories", categoryToDelete.id));
      setCategories(categories.filter(cat => cat.id !== categoryToDelete.id));
      toast({ title: "Success", description: `Category "${categoryToDelete.name}" deleted.` });
    } catch (err) {
      console.error("Error deleting category:", err);
      toast({ title: "Error", description: "Could not delete category.", variant: "destructive" });
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Manage Career Categories</CardTitle>
        <CardDescription>Add, view, or remove career categories used in AI analysis. Changes are saved to Firestore.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2 items-end">
          <div className="flex-grow space-y-1">
            <Label htmlFor="newCategory">New Category Name</Label>
            <Input 
              id="newCategory" 
              value={newCategory} 
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="e.g., Digital Marketing"
              disabled={isLoading}
            />
          </div>
          <Button onClick={handleAddCategory} className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
        
        {isLoading && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="mr-2 h-6 w-6 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading categories...</p>
          </div>
        )}

        {error && !isLoading && (
           <div className="flex items-center gap-2 p-4 rounded-md border border-destructive bg-destructive/10 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <div>
            <h3 className="font-semibold mb-2 text-muted-foreground">Existing Categories:</h3>
            {categories.length > 0 ? (
              <ul className="space-y-2 max-h-96 overflow-y-auto">
                {categories.map((category) => (
                  <li key={category.id} className="flex justify-between items-center p-3 border rounded-md bg-secondary/30">
                    <span className="text-sm">{category.name}</span>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category)} aria-label={`Delete ${category.name}`}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No categories defined yet. Add one above!</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
