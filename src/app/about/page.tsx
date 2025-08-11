
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Target, Lightbulb, Zap } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-card rounded-lg shadow">
        <h1 className="text-4xl font-bold text-primary mb-2">About StudKits</h1>
        <p className="text-lg text-muted-foreground">
          Your partner in innovative project kits and learning.
        </p>
      </section>

      <Card className="shadow-lg">
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
        <Card className="shadow-md">
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
              <li>IoT-Based Projects</li>
              <li>Robotics & Automation</li>
              <li>Embedded Systems (Arduino, ESP32, Raspberry Pi)</li>
              <li>PCB Design & Prototyping Services</li>
              <li>Custom Project Presentations for any topic</li>
            </ul>
            <p>
              Each kit comes with all necessary components and clear instructions to ensure a smooth
              building experience.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
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

      <Card className="shadow-lg">
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
            <strong className="text-foreground">Expert Services:</strong> From PCB design to custom presentations, our services are designed to help you succeed.
          </p>
          <p>
            <strong className="text-foreground">Support:</strong> While we provide comprehensive guides, we're here to help if you get stuck.
          </p>
          <p>
            <strong className="text-foreground">Customization:</strong> Have a unique idea? We offer custom project and presentation design services to bring your vision to life.
          </p>
        </CardContent>
      </Card>

      <section className="py-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">Meet the Founders</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="text-center shadow-md p-4">
            <CardHeader>
              <div className="mx-auto h-32 w-32 rounded-full bg-muted flex items-center justify-center border-4 border-primary/20">
                <Users className="h-16 w-16 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <CardTitle className="text-2xl">Mohit Kadu</CardTitle>
              <CardDescription className="text-base text-accent">Founder</CardDescription>
              <p className="text-sm text-muted-foreground pt-2">
                Hello i am Mohit Kadu founder of Studkits. Currently persuing Diploma in Electronics and Telecommunication at Vidyalankar Polytechnic
              </p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-md p-4">
            <CardHeader>
                <div className="mx-auto h-32 w-32 rounded-full bg-muted flex items-center justify-center border-4 border-primary/20">
                    <Users className="h-16 w-16 text-muted-foreground" />
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <CardTitle className="text-2xl">Ved Bhardwaj</CardTitle>
              <CardDescription className="text-base text-accent">Founder</CardDescription>
               <p className="text-sm text-muted-foreground pt-2">
                Hello i am Ved Bhardwaj founder of Studkits. Currently persuing Diploma in Electronics and Telecommunication at Vidyalankar Polytechnic
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

    </div>
  );
}
