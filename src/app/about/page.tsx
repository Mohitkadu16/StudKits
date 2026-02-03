'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Target, Lightbulb, Zap, Mail, Instagram, Phone, Award, Clock, Rocket, Shield, HeartHandshake, TrendingUp } from 'lucide-react';      
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from 'framer-motion';

export default function AboutUsPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" aria-hidden="true"></div>
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            About StudKits
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Your partner in innovative project kits and learning.
          </p>
        </div>
      </section>

      {/* Mission Card - Full Width with Gradient */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card className="relative overflow-hidden border-2 border-primary/30 hover:border-primary/50 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-primary/10">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent" />
          
          <CardHeader className="relative pb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold text-foreground">Our Mission</CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="relative">
            <p className="text-lg text-foreground/90 leading-relaxed">
              At StudKits, we are passionate about <span className="font-semibold text-primary">empowering students, hobbyists, and professionals</span> by providing high-quality, ready-to-assemble project kits and expert services. We believe that <span className="font-semibold text-primary">hands-on experience</span> is key to mastering technical skills, and our goal is to make innovative projects and professional presentations accessible to everyone.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* What We Offer & Vision - Two Column Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* What We Offer Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="h-full relative overflow-hidden border-2 border-primary/30 hover:border-primary/50 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-primary/10">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
            
            <CardHeader className="relative pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">What We Offer</CardTitle>
              </div>
            </CardHeader>
            
            <CardContent className="relative space-y-4">
              <p className="text-base text-foreground/80 leading-relaxed">
                We specialize in a wide range of project kits and services:
              </p>
              
              <div className="space-y-2.5">
                {[
                  'Both Types of Projects (Micro & Capstone)',
                  'IoT-Based Projects',
                  'Robotics & Automation',
                  'Embedded Systems (Arduino, ESP32, Raspberry Pi)',
                  'PCB Design & Prototyping Services',
                  'Custom Project Presentations for any topic',
                  'Troubleshooting Service'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                    <span className="text-foreground/80 group-hover:text-foreground transition-colors leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 mt-4 border-t border-primary/10">
                <p className="text-sm text-foreground/70 leading-relaxed italic">
                  Each kit comes with all necessary components and clear instructions to ensure a smooth building experience.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Vision Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full relative overflow-hidden border-2 border-primary/30 hover:border-primary/50 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-primary/10">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
            
            <CardHeader className="relative pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                  <Lightbulb className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">Our Vision</CardTitle>
              </div>
            </CardHeader>
            
            <CardContent className="relative">
              <p className="text-base text-foreground/90 leading-relaxed mb-6">
                To be the <span className="font-semibold text-primary">leading provider</span> of project-based learning solutions, fostering innovation and practical skills in the tech community.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <Rocket className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Constantly expand our offerings with the latest technologies
                  </p>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Stay ahead with cutting-edge project ideas and innovations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Company Timeline */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Journey</h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 hidden md:block" />
          
          <div className="space-y-12">
            {[
              { year: '2025', title: 'Founded', description: 'StudKits was born from a passion to make technical education accessible', icon: Rocket },
              { year: '2025', title: '10+ Projects', description: 'Completed & Delivered 10+ successful projects', icon: Award },
              { year: '2025', title: '5+ Colleges', description: 'Collaborated with students from over 5+ colleges across India', icon: TrendingUp },
              { year: '2025', title: 'Marketplace', description: 'Launching marketplace for project kits', icon: Lightbulb },
            ].map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center md:text-inherit`}>
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-300">
                    <div className="text-primary font-bold text-xl mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
                
                {/* Center icon */}
                <div className="relative z-10 hidden md:block">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <milestone.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
                
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose StudKits - Icon Grid */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center text-foreground mb-4">Why Choose StudKits?</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          We combine quality, expertise, and support to deliver the best project experience
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Award,
              title: 'Quality Components',
              description: 'High-quality components for reliable projects'
            },
            {
              icon: Target,
              title: 'Curated Projects',
              description: 'Engaging and industry-relevant selections'
            },
            {
              icon: Users,
              title: 'Expert Services',
              description: 'Professional design and troubleshooting'
            },
            {
              icon: HeartHandshake,
              title: 'Dedicated Support',
              description: 'Comprehensive guides and assistance'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <Card className="h-full border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Strategic Partners */}
      <section className="py-8 relative">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">Strategic Partners</h2>
        <div className="max-w-4xl mx-auto px-4">
          <Card className="text-center p-6 hover:scale-[1.02] transition-all duration-300 border-2 border-[#4285F4] rounded-xl">
            <CardHeader>
              <div className="mx-auto h-60 w-60 overflow-hidden rounded-lg p-2">
                <Image
                  src="/images/aiskool-logo.webp"
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
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           whileHover={{ y: -8, scale: 1.02 }}
         >
          <Card className="text-center p-4 h-full transition-all duration-300 border-2 border-[#4285F4] rounded-xl hover:shadow-2xl hover:shadow-primary/20">
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
          </motion.div>
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.1 }}
             whileHover={{ y: -8, scale: 1.02 }}
           >
           <Card className="text-center p-4 h-full transition-all duration-300 border-2 border-[#4285F4] rounded-xl hover:shadow-2xl hover:shadow-primary/20">
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
                Hello I am Mohit Kadu Co Founder | Web Developer of Studkits. Currently Completed Diploma in Electronics and Telecommunication at Vidyalankar Polytechnic
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
          </motion.div>
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.2 }}
             whileHover={{ y: -8, scale: 1.02 }}
           >
           <Card className="text-center p-4 h-full transition-all duration-300 border-2 border-[#4285F4] rounded-xl hover:shadow-2xl hover:shadow-primary/20">
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
          </motion.div>
          </div>
          {/* Last two cards centered */}
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
            <Card className="text-center p-4 h-full transition-all duration-300 border-2 border-[#4285F4] rounded-xl hover:shadow-2xl hover:shadow-primary/20">
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
          </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
            <Card className="text-center p-4 h-full transition-all duration-300 border-2 border-[#4285F4] rounded-xl hover:shadow-2xl hover:shadow-primary/20">
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
          <Card className="text-center p-4 h-full transition-all duration-300 border-2 border-[#4285F4] rounded-xl hover:shadow-2xl hover:shadow-primary/20">
            <CardHeader>
              <div className="mx-auto h-32 w-32 rounded-full overflow-hidden border-4 border-primary/40 bg-white/20">
                <Image
                  src={encodeURI('/images/Janhavi Gangan.jpeg')}
                  alt="Janhavi Gangan"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <CardTitle className="text-2xl">Janhavi Gangan</CardTitle>
              <CardDescription className="text-base text-primary">(PR) Public Relation Head</CardDescription>
                <p className="text-sm text-muted-foreground pt-2">
                  Hello I am Janhavi Gangan Public Relation Head of Studkits. Currently pursuing Bachelors in Electronics and Telecommunication Engineering at Datta Meghe College of Engineering.
              </p>
              <div className="flex items-center justify-center gap-4 mt-4 p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 shadow-lg">
                <Button variant="ghost" size="icon"  asChild className="rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 shadow-lg">
                  <Link href="mailto:janhavi.a05@gmail.com" target="_blank" rel="noopener noreferrer">
                    <Mail className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild className="rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 shadow-lg">
                  <Link href="https://www.instagram.com/janhavi.__.__/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild className="rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10 shadow-lg">
                  <Link href="tel:+918779847138">
                    <Phone className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}