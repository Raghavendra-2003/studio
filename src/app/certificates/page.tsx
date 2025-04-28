import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, CheckCircle, FileText } from "lucide-react";
import Image from 'next/image'; // Import next/image

// Mock data for certificates - replace with actual data fetching
const certificates = [
    { id: 'c1', name: 'Advanced React Patterns', issuer: 'Udemy', verified: true, link: 'https://picsum.photos/seed/cert1/300/200', type: 'image' },
    { id: 'c2', name: 'Machine Learning Specialization', issuer: 'Coursera', verified: true, link: 'https://picsum.photos/seed/cert2/300/200', type: 'image' },
    { id: 'c3', name: 'Professional Cloud Architect', issuer: 'Google Cloud', verified: false, link: '#', type: 'pdf' }, // Placeholder for PDF
];

export default function CertificatesPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">My Certificates</h1>
        <Button>
          <UploadCloud className="mr-2 h-4 w-4" /> Upload Certificate
        </Button>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {certificates.length > 0 ? (
           certificates.map((cert) => (
             <Card key={cert.id} className="shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
               <CardHeader className="p-0">
                 {cert.type === 'image' ? (
                   <div className="relative w-full h-40">
                      <Image
                        src={cert.link}
                        alt={`${cert.name} certificate preview`}
                        layout="fill"
                        objectFit="cover"
                         className="bg-muted" // Add a background color for loading state
                      />
                   </div>
                 ) : (
                   <div className="flex items-center justify-center h-40 bg-secondary">
                     <FileText className="h-16 w-16 text-muted-foreground" />
                   </div>
                 )}
               </CardHeader>
               <CardContent className="p-4">
                 <CardTitle className="text-lg mb-1">{cert.name}</CardTitle>
                 <CardDescription>Issued by: {cert.issuer}</CardDescription>
               </CardContent>
               <CardFooter className="p-4 pt-0 flex justify-between items-center">
                 {cert.verified ? (
                   <span className="flex items-center text-xs text-green-600">
                     <CheckCircle className="mr-1 h-3 w-3" /> Verified
                   </span>
                 ) : (
                   <span className="text-xs text-amber-600">Pending Verification</span>
                 )}
                 {/* Add link/button to view full certificate */}
                 <Button variant="link" size="sm" className="p-0 h-auto">View</Button>
               </CardFooter>
             </Card>
           ))
         ) : (
           <p className="text-muted-foreground col-span-full text-center">No certificates uploaded yet. Click "Upload Certificate" to add them.</p>
         )}
       </div>
    </div>
  );
}
