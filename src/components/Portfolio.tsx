import { ArrowRight, Calendar, Download, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const slideIn = {
  hidden: { x: -60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
}

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedSection = ({ children, className = "", delay = 0 }: AnimatedSectionProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0)
  const [skillValues, setSkillValues] = useState({
    projectManagement: 0,
    teamLeadership: 0,
    technicalExpertise: 0,
    problemSolving: 0,
    communication: 0,
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setSkillValues({
        projectManagement: 95,
        teamLeadership: 90,
        technicalExpertise: 85,
        problemSolving: 92,
        communication: 88,
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-gray-950">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:border-gray-800">
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-xl"
          >
            Udayakumar
          </motion.div>
          <nav className="hidden md:flex flex-row items-center gap-5 text-sm lg:gap-6">
            {["About", "Experience", "Skills", "Education", "Contact"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors hover:text-primary ${index === 0 ? "font-bold" : "text-muted-foreground"}`}
                >
                  {item}
                </a>
              </motion.div>
            ))}
          </nav>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Button>
              <Download className="mr-2 h-4 w-4" /> Resume
            </Button>
          </motion.div>
        </div>
      </header>

      <main className="container py-10">
        {/* Hero Section */}
        <section className="py-12 md:py-24 lg:py-32 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 -z-10 opacity-30"
            style={{
              backgroundImage: "url('/grid-pattern.svg')",
              backgroundSize: "cover",
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          />

          <motion.div className="space-y-6 md:w-1/2" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
              variants={fadeIn}
            >
              Udayakumar <span className="text-primary">(PMP)</span>
            </motion.h1>
            <motion.p className="text-xl text-muted-foreground max-w-[600px]" variants={fadeIn}>
              Project Management Professional with 11+ years of expertise in design and manufacturing
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeIn}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              >
                <a href="#contact" className="flex items-center">
                  Contact Me <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <a href="#experience">View Experience</a>
              </Button>
            </motion.div>
            <motion.div className="flex flex-wrap gap-4 pt-4" variants={fadeIn}>
              {[
                { icon: <MapPin className="mr-1 h-4 w-4" />, text: "Richmond, BC" },
                { icon: <Phone className="mr-1 h-4 w-4" />, text: "604.213.0064" },
                { icon: <Mail className="mr-1 h-4 w-4" />, text: "udai.rajendran@gmail.com" },
                { icon: <Linkedin className="mr-1 h-4 w-4" />, text: "linkedin.com/in/udayakumarcad" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center text-sm text-muted-foreground bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm"
                  whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  {item.icon} {item.text}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-full blur-3xl" />
              <img
                src="./thumbnail.png"
                alt="Udayakumar"
                className="relative rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-xl"
              />
              <motion.div
                className="absolute -bottom-5 -right-5 bg-gradient-to-r from-primary to-purple-600 text-white p-4 rounded-full shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <span className="font-bold">PMP</span>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 scroll-mt-16">
          <AnimatedSection className="mb-8">
            <h2 className="text-3xl font-bold border-b pb-2 inline-block relative">
              About Me
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-purple-600"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </h2>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-2">
            <AnimatedSection delay={0.1}>
              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="h-full border-none shadow-lg bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-t-lg">
                    <CardTitle>Summary of Qualifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <p>
                      Experienced design and manufacturing project leader with 11 years of expertise managing new
                      product development cross-functional teams and delivering projects on schedule.
                    </p>
                    <p>
                      I led projects requiring a high degree of technical proficiency and served as the primary
                      subject-matter expert in sheetmetal parts. Complete project ownership, from conception to
                      execution.
                    </p>
                    <p>
                      I possess excellent organizational skills, attention to detail, and interpersonal skills. Adept at
                      Mastering New Concepts with strong analytical skills such as critical thinking and
                      problem-solving.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="h-full border-none shadow-lg bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-t-lg">
                    <CardTitle>Professional Approach</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <p>
                      Skilled in workflow management, sourcing management, resource allocation, risk management, and the
                      proven ability to adapt to dynamic environments and solve complex problems.
                    </p>
                    <p>
                      I am dedicated to meeting project objectives while cultivating a collaborative and encouraging
                      work environment. Working towards obtaining the PE designation.
                    </p>
                    <motion.div
                      className="flex flex-wrap gap-2 mt-4"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={staggerContainer}
                    >
                      {[
                        "Project Management",
                        "Product Development",
                        "Customer Centric",
                        "Supplier Management",
                        "Cross-functional Teams",
                      ].map((skill, index) => (
                        <motion.div key={index} variants={slideIn} whileHover={{ scale: 1.05 }}>
                          <Badge className="bg-gradient-to-r from-primary/80 to-purple-600/80 hover:from-primary hover:to-purple-600 text-white border-none py-1.5">
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>

        {/* Skills Visualization Section */}
        <AnimatedSection className="py-12">
          <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-600/10">
              <CardTitle>Core Competencies</CardTitle>
              <CardDescription>Key strengths and expertise areas</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Project Management</span>
                    <span>{skillValues.projectManagement}%</span>
                  </div>
                  <Progress value={skillValues.projectManagement} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Team Leadership</span>
                    <span>{skillValues.teamLeadership}%</span>
                  </div>
                  <Progress value={skillValues.teamLeadership} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Technical Expertise</span>
                    <span>{skillValues.technicalExpertise}%</span>
                  </div>
                  <Progress value={skillValues.technicalExpertise} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Problem Solving</span>
                    <span>{skillValues.problemSolving}%</span>
                  </div>
                  <Progress value={skillValues.problemSolving} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Communication</span>
                    <span>{skillValues.communication}%</span>
                  </div>
                  <Progress value={skillValues.communication} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Experience Section */}
        <section id="experience" className="py-12 scroll-mt-16">
          <AnimatedSection className="mb-8">
            <h2 className="text-3xl font-bold border-b pb-2 inline-block relative">
              Work Experience
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-purple-600"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </h2>
          </AnimatedSection>

          <div className="space-y-8">
            {[
              {
                title: "Assembly Team Lead",
                company: "SEI Industries | Delta, BC",
                period: "March 2024 - Present",
                duties: [
                  "Creating weekly and monthly plans, assigning responsibilities to the team, and tracking progress against the plan. Assembling the Bambi bucket, testing its quality, and preparing for shipment.",
                  "Coordinating with the supply chain team to receive the service product on time and return the product to the customer on time once service is completed.",
                  "Managing with the design team to implement the design modification and testing the product's results against the target.",
                ],
              },
              {
                title: "Project Lead",
                company: "Renault Nissan Technology Business Centre India Pvt Ltd. | Chennai, India",
                period: "March 2016 - April 2023",
                duties: [
                  "Collaborated with the team to identify the technical issue and propose solutions to resolve it. Establishing and communicating team goals. Monitored and directed DFEA and FMEA plans.",
                  "Benchmark the product and design pre-conception. Managed suppliers by communicating quality metrics, procedures, and objectives and ensuring concerns are handled to meet project deliverables.",
                  "Recognized areas of improvement to optimize product performance. Collaborated with design team to source new materials and technologies, resulting in a 30% improvement in product performance.",
                  "Coordinated with the QA team and approved the documentation to begin mass production. Accountable for planning and running prototype builds, collecting feedback, and incorporating into the product before launch.",
                ],
              },
              {
                title: "Project Technical Coordinator",
                company: "FORD INDIA Pvt ltd Through EASI Engineering private Limited | Chennai, India",
                period: "August 2014 - March 2016",
                duties: [
                  "Managed all aspects of the mechanical design process, from concept to manufacturing, ensuring projects were completed on time and within budget. Presenting a weekly status report to the PMO.",
                  "Mentored mechanical product testing and verification, alongside report writing. Responsible for the change management process and delivering 2D, 3D, and BOM in PLM.",
                  "Implemented new design processes and tools to streamline workflow and improve productivity, resulting in a 15% reduction in project timelines.",
                  "Collaborated with cross-functional teams to identify and solve design challenges, leading to the successful launch of new products in the market.",
                ],
              },
            ].map((job, index) => (
              <AnimatedSection key={index} delay={0.1 * index}>
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-600/10">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <CardTitle>{job.title}</CardTitle>
                          <CardDescription>{job.company}</CardDescription>
                        </div>
                        <Badge variant="outline" className="w-fit bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                          <Calendar className="mr-1 h-4 w-4" /> {job.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <motion.ul
                        className="list-disc pl-5 space-y-2"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                      >
                        {job.duties.map((duty, i) => (
                          <motion.li key={i} variants={fadeIn}>
                            {duty}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}

            <AnimatedSection delay={0.4}>
              <Tabs defaultValue="more" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="more">Previous Experience</TabsTrigger>
                  <TabsTrigger value="hide">Hide</TabsTrigger>
                </TabsList>
                <TabsContent value="more" className="space-y-4 mt-4">
                  {[
                    {
                      title: "Design Engineer",
                      company: "HIROTEC INDIA Pvt Ltd | Coimbatore, India",
                      period: "September 2012 - August 2014",
                      duties: [
                        "Engineered parts and assemblies using 3D software. Conceptualize BIW robotic line jigs and fixtures.",
                        "Experienced in selecting materials and fabrication technologies. Created assembly sequence and weld spot sequence sheet. Designed pre-production and checking fixture.",
                        "Collaborated with suppliers to improve component selection, reduce material and production costs, and uphold quality requirements. Responsible for preparing and tracking project agreements.",
                        "Developed the 2D design for the jig and fixture and prepared the GD&T sheet.",
                      ],
                    },
                    {
                      title: "Manufacturing Engineer",
                      company: "AQUA FLOW | Coimbatore, India",
                      period: "August 2011 - May 2012",
                      duties: [
                        "Managed the scheduling and coordination of all production activities, ensuring projects were completed on time and within budget.",
                        "Oversaw the procurement of materials and equipment, negotiating vendor contracts to secure cost-effective solutions.",
                        "Conducted quality control checks throughout the production cycle to maintain high standards of output and customer satisfaction.",
                      ],
                    },
                  ].map((job, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 * index }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-600/10">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div>
                              <CardTitle>{job.title}</CardTitle>
                              <CardDescription>{job.company}</CardDescription>
                            </div>
                            <Badge variant="outline" className="w-fit bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                              <Calendar className="mr-1 h-4 w-4" /> {job.period}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <motion.ul
                            className="list-disc pl-5 space-y-2"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                          >
                            {job.duties.map((duty, i) => (
                              <motion.li key={i} variants={fadeIn}>
                                {duty}
                              </motion.li>
                            ))}
                          </motion.ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </TabsContent>
                <TabsContent value="hide"></TabsContent>
              </Tabs>
            </AnimatedSection>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-12 scroll-mt-16">
          <AnimatedSection className="mb-8">
            <h2 className="text-3xl font-bold border-b pb-2 inline-block relative">
              Technical Skills
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-purple-600"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </h2>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Applications",
                skills: ["Microsoft Office 365", "Gantt Project", "Jira", "Trello", "Microsoft Project"],
              },
              {
                title: "Tools",
                skills: [
                  "Google Workspace",
                  "SharePoint",
                  "Kanban board",
                  "Catia",
                  "AutoCAD",
                  "SolidWorks",
                  "PLM",
                  "PRO E",
                ],
              },
              {
                title: "Project Management",
                skills: [
                  "Agile",
                  "Waterfall",
                  "Risk Management",
                  "Cost Management",
                  "Supplier Management",
                  "BOM Management",
                  "APQP",
                  "PAPP",
                ],
              },
            ].map((category, index) => (
              <AnimatedSection key={index} delay={0.1 * index}>
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="h-full border-none shadow-lg bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-600/10">
                      <CardTitle>{category.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <motion.div
                        className="flex flex-wrap gap-2"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                      >
                        {category.skills.map((skill, i) => (
                          <motion.div key={i} variants={slideIn} whileHover={{ scale: 1.05 }}>
                            <Badge className="bg-gradient-to-r from-primary/20 to-purple-600/20 text-primary hover:from-primary/30 hover:to-purple-600/30 border-primary/20 py-1.5">
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-12 scroll-mt-16">
          <AnimatedSection className="mb-8">
            <h2 className="text-3xl font-bold border-b pb-2 inline-block relative">
              Education & Certifications
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-purple-600"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </h2>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Project Management Professional (PMP)",
                institution: "Project Management Institute (PMI)",
                period: "March 2023 - March 2026",
                description:
                  "Globally recognized certification demonstrating expertise in project management principles, methodologies, and best practices.",
              },
              {
                title: "Bachelor Degree, Mechanical Engineering",
                institution: "Hindustan College of Engineering & Technology | Coimbatore, India",
                period: "May 2008 - June 2011",
                description:
                  "Comprehensive education in mechanical engineering principles, design, and manufacturing processes.",
              },
            ].map((edu, index) => (
              <AnimatedSection key={index} delay={0.1 * index}>
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="h-full border-none shadow-lg bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-600/10">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <CardTitle>{edu.title}</CardTitle>
                        <Badge variant="outline" className="w-fit bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                          <Calendar className="mr-1 h-4 w-4" /> {edu.period}
                        </Badge>
                      </div>
                      <CardDescription>{edu.institution}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        {edu.description}
                      </motion.p>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 scroll-mt-16">
          <AnimatedSection className="mb-8">
            <h2 className="text-3xl font-bold border-b pb-2 inline-block relative">
              Contact Me
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-purple-600"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </h2>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-2">
            <AnimatedSection delay={0.1}>
              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="h-full border-none shadow-lg bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-600/10">
                    <CardTitle>Get In Touch</CardTitle>
                    <CardDescription>Fill out the form and I'll get back to you as soon as possible.</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form className="space-y-4">
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                          >
                            <label
                              htmlFor="first-name"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              First name
                            </label>
                            <input
                              id="first-name"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                            />
                          </motion.div>
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                          >
                            <label
                              htmlFor="last-name"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Last name
                            </label>
                            <input
                              id="last-name"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                            />
                          </motion.div>
                        </div>
                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          viewport={{ once: true }}
                        >
                          <label
                            htmlFor="email"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                          />
                        </motion.div>
                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          viewport={{ once: true }}
                        >
                          <label
                            htmlFor="message"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Message
                          </label>
                          <textarea
                            id="message"
                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-none"
                          />
                        </motion.div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                        >
                          Send Message
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="h-full border-none shadow-lg bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-600/10">
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Feel free to reach out through any of these channels.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    {[
                      { icon: <Phone className="h-6 w-6 text-primary" />, title: "Phone", content: "604.213.0064" },
                      {
                        icon: <Mail className="h-6 w-6 text-primary" />,
                        title: "Email",
                        content: "udai.rajendran@gmail.com",
                      },
                      {
                        icon: <MapPin className="h-6 w-6 text-primary" />,
                        title: "Location",
                        content: "Richmond, BC, Canada",
                      },
                      {
                        icon: <Linkedin className="h-6 w-6 text-primary" />,
                        title: "LinkedIn",
                        content: "linkedin.com/in/udayakumarcad",
                        isLink: true,
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        viewport={{ once: true }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.div
                          className="bg-gradient-to-r from-primary/20 to-purple-600/20 p-3 rounded-full"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          {item.icon}
                        </motion.div>
                        <div>
                          <p className="text-sm font-medium">{item.title}</p>
                          {item.isLink ? (
                            <a
                              href={`https://www.${item.content}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline"
                            >
                              {item.content}
                            </a>
                          ) : (
                            <p className="text-sm text-muted-foreground">{item.content}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0 bg-white/50 backdrop-blur-sm dark:bg-gray-900/50 dark:border-gray-800">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <motion.p
            className="text-center text-sm leading-loose text-muted-foreground md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            © 2024 Udayakumar. All rights reserved.
          </motion.p>
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {[
              { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
              { icon: <Github className="h-5 w-5" />, label: "GitHub" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {item.icon}
                  <span className="sr-only">{item.label}</span>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </footer>
    </div>
  )
}