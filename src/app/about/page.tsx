'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Target, Lightbulb, Zap, Mail, Instagram, Phone } from 'lucide-react';      
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutUsPage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12 relative backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-primary mb-4">About StudKits</h1>
        <p className="text-lg text-muted-foreground">
          Your partner in innovative project kits and learning.
        </p>
      </section>

      <Card className="hover:scale-[1.01] transition-all duration-300 border-2 border-[#4285F4] rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Users className="mr-3 h-7 w-7 text-primary" />
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent className="text-lg text-foreground/80 leading-relaxed">
          <p>
            At StudKits, we are passionate about empowering students, hobbyists, and professionals
            by providing high-quality, ready-to-assemble project kits and expert services. We believe that hands-on
            experience is key to mastering technical skills, and our goal is to make innovative
            projects and professional presentations accessible to everyone.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:scale-[1.02] transition-all duration-300 border-2 border-[#4285F4] rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-6 w-6 text-accent" />
              What We Offer
            </CardTitle>
          </CardHeader>
          <CardContent className="text-foreground/80 space-y-2">
            <p>
              We specialize in a wide range of project kits and services including:
            </p>
            <ul className="list-disc list-inside pl-4">
              <li>Both Types of Projects (Micro & Capstone)</li>
              <li>IoT-Based Projects</li>
              <li>Robotics & Automation</li>
              <li>Embedded Systems (Arduino, ESP32, Raspberry Pi)</li>
              <li>PCB Design & Prototyping Services</li>
              <li>Custom Project Presentations for any topic</li>
              <li>Troubleshooting Service</li>
            </ul>
            <p>
              Each kit comes with all necessary components and clear instructions to ensure a smooth
              building experience.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:scale-[1.02] transition-all duration-300 border-2 border-[#4285F4] rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="mr-2 h-6 w-6 text-accent" />
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent className="text-foreground/80">
            <p>
              To be the leading provider of project-based learning solutions, fostering innovation
              and practical skills in the tech community. We aim to constantly expand our offerings
              with the latest technologies and project ideas.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border-2 border-[#4285F4] rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Zap className="mr-3 h-7 w-7 text-primary" />
            Why Choose StudKits?
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground/80 space-y-3">
          <p>
            <strong className="text-foreground">Quality Components:</strong> We source high-quality components to ensure your projects work reliably.
          </p>
          <p>
            <strong className="text-foreground">Curated Projects:</strong> Our projects are carefully selected to be engaging, educational, and relevant to current industry trends.
          </p>
           <p>
            <strong className="text-foreground">Expert Services:</strong> From Project designing to custom presentations to troubleshooting services, our services are designed to help you succeed.
          </p>
          <p>
            <strong className="text-foreground">Support:</strong> While we provide comprehensive guides & troubleshooting, we're here to help if you get stuck.
          </p>
          <p>
            <strong className="text-foreground">Customization:</strong> Have a unique idea? We offer custom project and presentation design services to bring your vision to life.
          </p>
        </CardContent>
      </Card>

      <section className="py-8 relative">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">Strategic Partners</h2>
        <div className="max-w-4xl mx-auto px-4">
          <Card className="text-center p-6 hover:scale-[1.02] transition-all duration-300 border-2 border-[#4285F4] rounded-xl">
            <CardHeader>
              <div className="mx-auto h-40 w-40 overflow-hidden rounded-lg p-2">
                <Image
                  src="/images/aiskool-logo.png"
                  alt="AISkool Logo"
                  width={160}
                  height={160}
                  className="object-contain w-full h-full"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <CardTitle className="text-2xl">AISkool</CardTitle>
              <p className="text-base text-muted-foreground">
                AISkool is a STEM learning platform for kids, offering hands-on courses in Robotics, 
                Coding, and AI to build creativity, problem-solving, and future-ready skills, now 
                expanding globally under Academik America.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-8 relative">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">Meet "Team StudKits"</h2>
        <div className="space-y-8 max-w-4xl mx-auto px-4">
          {/* First three cards in a row */}
          <div className="grid md:grid-cols-3 gap-8">
         <Card className="text-center p-4 hover:scale-[1.02] transition-all duration-300 border-2 border-[#4285F4] rounded-xl">
            <CardHeader>
                <div className="mx-auto h-32 w-32 rounded-full overflow-hidden border-4 border-primary/40 bg-white/20">
                  <Image
                    src={encodeURI('/images/ved photo.jpg')}
                    alt="Ved Bhardwaj"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <CardTitle className="text-2xl">Ved Bhardwaj</CardTitle>
              <CardDescription className="text-base text-primary">Founder</CardDescription>
               <p className="text-sm text-muted-foreground pt-2">
                Hello I am Ved Bhardwaj Founder of Studkits. Currently pursuing Diploma in Electronics and Telecommunication at Vidyalankar Polytechnic
              </p>
              <div className="flex items-center justify-center gap-4 mt-4 p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 shadow-lg">
                <Button variant="ghost" size="icon" asChild className="rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 shadow-lg">
                  <Link href="mailto:ved.bhardwaj2006@gmail.com" target="_blank" rel="noopener noreferrer">
                    <Mail className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild className="rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 shadow-lg">
                  <Link href="https://www.instagram.com/bhardwaj_ved123/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild className="rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 shadow-lg">
                  <Link href="tel:+918976451602">
                    <Phone className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
           </Card>
           <Card className="text-center p-4 hover:scale-[1.02] transition-all duration-300 border-2 border-[#4285F4] rounded-xl">
            <CardHeader>
              <div className="mx-auto h-32 w-32 rounded-full overflow-hidden border-4 border-primary/40 bg-white/20">
                <Image
                  src={encodeURI('/images/mohit photo.jpg')}
                  alt="Mohit Kadu"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <CardTitle className="text-2xl">Mohit Kadu</CardTitle>
              <CardDescription className="text-base text-primary">Co Founder | Web Developer</CardDescription>
              <p className="text-sm text-muted-foreground pt-2">
                Hello I am Mohit Kadu Co Founder | Web Developer of Studkits. Currently pursuing Diploma in Electronics and Telecommunication at Vidyalankar Polytechnic
              </p>
              <div className="flex items-center justify-center gap-4 mt-4 p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 shadow-lg">
                <Button variant="ghost" size="icon" asChild className="rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 shadow-lg">
                  <Link href="mailto:mohitkadu13@gmail.com" target="_blank" rel="noopener noreferrer">
                    <Mail className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild className="rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 shadow-lg">
                  <Link href="https://www.instagram.com/mohitkadu15/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild className="rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 shadow-lg">
                  <Link href="tel:+917506104767">
                    <Phone className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
           </Card>
           <Card className="text-center p-4 hover:scale-[1.02] transition-all duration-300 border-2 border-[#4285F4] rounded-xl">
            <CardHeader>
              <div className="mx-auto h-32 w-32 rounded-full overflow-hidden border-4 border-primary/40 bg-white/20">
                <Image
                  src={encodeURI('/images/amit.jpg')}
                  alt="Amit Prajapati"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <CardTitle className="text-2xl">Amit Prajapati</CardTitle>
              <CardDescription className="text-base text-primary">Managing Director</CardDescription>
              <p className="text-sm text-muted-foreground pt-2">
                Hello I am Amit Prajapati Managing Director of Studkits. Currently pursuing Btech at Ratan Tata Maharashtra State Skill University
              </p>
              <div className="flex items-center justify-center gap-4 mt-4 p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 shadow-lg">
                <Button variant="ghost" size="icon" asChild className="rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 shadow-lg">
                  <Link href="mailto:amitprajapati4441@gmail.com" target="_blank" rel="noopener noreferrer">
                    <Mail className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild className="rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 shadow-lg">
                  <Link href="https://www.instagram.com/amit_pjp_74/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild className="rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 shadow-lg">
                  <Link href="tel:+917339555257">
                    <Phone className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
            </Card>
          </div>
          {/* Last two cards centered */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Card className="text-center p-4 hover:scale-[1.02] transition-all duration-300 border-2 border-[#4285F4] rounded-xl">
            <CardHeader>
              <div className="mx-auto h-32 w-32 rounded-full overflow-hidden border-4 border-primary/40 bg-white/20">
                <Image
                  src={encodeURI('/images/mihir.jpg')}
                  alt="Mihir Mota"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <CardTitle className="text-2xl">Mihir Mota</CardTitle>
              <CardDescription className="text-base text-primary">Marketing Head</CardDescription>
              <p className="text-sm text-muted-foreground pt-2">
                Hello I am Mihir Mota Marketing Head of Studkits. Currently pursuing Diploma in Electronics and Telecommunication at Vidyalankar Polytechnic
              </p>
              <div className="flex items-center justify-center gap-4 mt-4 p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 shadow-lg">
                <Button variant="ghost" size="icon" asChild className="rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 shadow-lg">
                  <Link href="mailto:mihirmota4@gmail.com" target="_blank" rel="noopener noreferrer">
                    <Mail className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild className="rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 shadow-lg">
                  <Link href="https://www.instagram.com/surreal.meher/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild className="rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 shadow-lg">
                  <Link href="tel:+919594854611">
                    <Phone className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
            <Card className="text-center p-4 hover:scale-[1.02] transition-all duration-300 border-2 border-[#4285F4] rounded-xl">
            <CardHeader>
              <div className="mx-auto h-32 w-32 rounded-full overflow-hidden border-4 border-primary/40 bg-white/20">
                <Image
                  src={encodeURI('/images/abhishek.jpg')}
                  alt="Abhishek Awasthi"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <CardTitle className="text-2xl">Abhishek Awasthi</CardTitle>
              <CardDescription className="text-base text-primary">Accounts Manager</CardDescription>
                <p className="text-sm text-muted-foreground pt-2">
                  Hello I am Abhishek Awasthi Accounts Manager of Studkits. Currently pursuing bachelors in Electronics and Telecommunication Engineering in Shivajirao Jondhle Of Engineering
              </p>
              <div className="flex items-center justify-center gap-4 mt-4 p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 shadow-lg">
                <Button variant="ghost" size="icon"  asChild className="rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 shadow-lg">
                  <Link href="mailto:abhishekawasthi85704@gmail.com" target="_blank" rel="noopener noreferrer">
                    <Mail className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild className="rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 shadow-lg">
                  <Link href="https://www.instagram.com/abhishekkkk_5853/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild className="rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 shadow-lg">
                  <Link href="tel:+918097652340">
                    <Phone className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
      </section>

    </div>
  );
}