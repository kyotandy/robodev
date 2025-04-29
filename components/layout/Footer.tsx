import Link from "next/link"
import { GitHubIcon, TwitterIcon, LinkedInIcon } from "@/components/icons/social-icons"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="font-bold text-xl">
              RoboDev
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              ロボット開発者のための技術ブログプラットフォーム。知識を共有し、作品を紹介しましょう。
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <GitHubIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <LinkedInIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">カテゴリー</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/category/hardware" className="text-sm text-muted-foreground hover:text-foreground">
                  メカニカル
                </Link>
              </li>
              <li>
                <Link href="/category/software" className="text-sm text-muted-foreground hover:text-foreground">
                  ソフトウェア
                </Link>
              </li>
              <li>
                <Link href="/category/electronics" className="text-sm text-muted-foreground hover:text-foreground">
                  エレクトロニクス
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">リソース</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  サイトについて
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                  よくある質問
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="text-sm text-muted-foreground hover:text-foreground">
                  コミュニティガイドライン
                </Link>
              </li>
              <li>
                <Link href="/models" className="text-sm text-muted-foreground hover:text-foreground">
                  CADモデル
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">法的情報</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
                  Cookieポリシー
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} RoboDev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}