
import { ShieldCheck, FileText, AlertTriangle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary font-headline mb-3">Terms of Service</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Please read these terms carefully before using PathFinder AI.
        </p>
      </div>

      <div className="prose prose-lg max-w-none mx-auto text-foreground prose-headings:text-primary prose-headings:font-headline prose-a:text-accent hover:prose-a:text-accent/80">
        <p className="text-sm text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>

        <h2 id="introduction">1. Introduction</h2>
        <p>Welcome to PathFinder AI (&quot;Platform&quot;), operated by PathFinder AI Team (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). These Terms of Service (&quot;Terms&quot;) govern your access to and use of our web-based frontend and AI-powered career guidance services. By accessing or using the Platform, you agree to be bound by these Terms.</p>

        <h2 id="services">2. Services Provided <FileText className="inline-block h-5 w-5 ml-1" /></h2>
        <p>PathFinder AI offers a platform for students to analyze their academic profiles, interests, and resumes to receive AI-driven career path suggestions and upskilling recommendations. The services are for informational and guidance purposes only and do not guarantee employment or admission to any program.</p>

        <h2 id="user-accounts">3. User Accounts</h2>
        <p>To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information when creating your account.</p>

        <h2 id="user-conduct">4. User Conduct & Responsibilities</h2>
        <p>You agree to use the Platform only for lawful purposes and in accordance with these Terms. You will not:</p>
        <ul>
          <li>Upload any false, misleading, or infringing content.</li>
          <li>Attempt to interfere with the proper working of the Platform.</li>
          <li>Use the Platform for any commercial solicitation purposes.</li>
          <li>Violate any applicable laws or regulations.</li>
        </ul>

        <h2 id="data-privacy">5. Data Privacy <ShieldCheck className="inline-block h-5 w-5 ml-1" /></h2>
        <p>Your privacy is important to us. Our collection and use of personal information in connection with the Platform are described in our Privacy Policy. By using the Platform, you consent to such collection and use. (Note: A separate Privacy Policy page would typically be linked here).</p>

        <h2 id="intellectual-property">6. Intellectual Property</h2>
        <p>All content and materials available on PathFinder AI, including but not limited to text, graphics, website name, code, images, and logos, are the intellectual property of PathFinder AI Team or its licensors and are protected by applicable copyright and trademark law.</p>

        <h2 id="disclaimers">7. Disclaimers <AlertTriangle className="inline-block h-5 w-5 ml-1" /></h2>
        <p>The Platform and its content are provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind, express or implied. We do not warrant that the service will be uninterrupted, timely, secure, or error-free. Career suggestions are based on AI analysis and should be considered as one of many factors in your decision-making process.</p>

        <h2 id="limitation-of-liability">8. Limitation of Liability</h2>
        <p>To the fullest extent permitted by applicable law, PathFinder AI Team shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the service; (b) any conduct or content of any third party on the service.</p>
        
        <h2 id="modifications">9. Modifications to Terms</h2>
        <p>We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page. Your continued use of reluctancenate after such modifications will constitute your acknowledgment of the modified Terms and agreement to abide and be bound by the modified Terms.</p>

        <h2 id="contact">10. Contact Information</h2>
        <p>If you have any questions about these Terms, please contact us at <a href="mailto:support@pathfinder.ai">support@pathfinder.ai</a> or through our <a href="/contact">Contact Page</a>.</p>
      </div>
    </div>
  );
}

