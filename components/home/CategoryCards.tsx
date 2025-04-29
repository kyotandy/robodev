import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, HardDrive, Code, Zap } from "lucide-react"

const categories = [
  {
    title: "メカ",
    description: "機械設計、アクチュエータ、センサー、物理的な部品について",
    icon: HardDrive,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "/category/hardware",
    count: 124
  },
  {
    title: "ソフト",
    description: "組込みシステム、アルゴリズム、機械学習、制御システムの開発",
    icon: Code,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    href: "/category/software",
    count: 245
  },
  {
    title: "電気・電子",
    description: "回路設計、PCB、電源システム、電子部品について",
    icon: Zap,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    href: "/category/electronics",
    count: 103
  }
]

export default function CategoryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link key={category.title} href={category.href} className="group">
          <Card className="h-full transition-all hover:shadow-md hover:bg-accent/50 group-hover:border-primary/20">
            <CardHeader className="pb-2">
              <div className={`p-2 w-fit rounded-md ${category.bgColor} ${category.color} mb-2`}>
                <category.icon className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">{category.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {category.description}
              </CardDescription>
            </CardHeader>
            <CardFooter className="pt-2 text-sm text-muted-foreground">
              {category.count} 記事
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}