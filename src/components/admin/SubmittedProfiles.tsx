
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { Button } from "../ui/button";

const dummyProfiles = [
  { id: "S001", name: "Alice Johnson", email: "alice@example.com", submittedDate: "2024-07-20", status: "Analyzed" },
  { id: "S002", name: "Bob Williams", email: "bob@example.com", submittedDate: "2024-07-19", status: "Pending" },
  { id: "S003", name: "Carol Davis", email: "carol@example.com", submittedDate: "2024-07-18", status: "Analyzed" },
  { id: "S004", name: "David Miller", email: "david@example.com", submittedDate: "2024-07-17", status: "Error" },
];

export default function SubmittedProfiles() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Submitted Student Profiles</CardTitle>
        <CardDescription>
          View and manage profiles submitted by students. (Demo: Shows placeholder data; a full version would connect to a database.)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Submitted Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyProfiles.map((profile) => (
              <TableRow key={profile.id}>
                <TableCell className="font-medium">{profile.id}</TableCell>
                <TableCell>{profile.name}</TableCell>
                <TableCell>{profile.email}</TableCell>
                <TableCell>{profile.submittedDate}</TableCell>
                <TableCell>
                  <Badge variant={
                    profile.status === "Analyzed" ? "default" :
                    profile.status === "Pending" ? "secondary" : "destructive"
                  } className="bg-opacity-70">
                    {profile.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" aria-label="View Profile">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

