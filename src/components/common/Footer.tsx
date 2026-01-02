import React from "react";
import { Hash, Github, NotebookIcon } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-base-200 w-full">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <footer className="footer sm:footer-horizontal text-base-content py-10">
          <nav>
            <h6 className="footer-title">FRONTEND</h6>
            <Link
              href="https://github.com/Son-Youjin"
              className="link link-hover"
            >
              손유진
            </Link>
            <Link href="https://github.com/joo93" className="link link-hover">
              방주영
            </Link>
          </nav>
          <nav>
            <h6 className="footer-title">BACKEND</h6>
            <Link
              href="https://github.com/shCHO9801"
              className="link link-hover"
            >
              조성현
            </Link>
            <Link
              href="https://github.com/geonuu09"
              className="link link-hover"
            >
              이건우
            </Link>
            <Link
              href="https://github.com/jooyeon0907"
              className="link link-hover"
            >
              신주연
            </Link>
            <Link
              href="https://github.com/P-Taeyoung"
              className="link link-hover"
            >
              박태영
            </Link>
          </nav>
        </footer>
      </div>
      <div className="border-base-300 border-t">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <footer className="footer text-base-content py-4">
            <aside className="grid-flow-col items-center">
              <Hash className="fill-current" />
              <p>
                BOOT TALK.
                <br />
                Crafted with passion by our team in 2025
              </p>
            </aside>
            <nav className="md:place-self-center md:justify-self-end">
              <div className="grid grid-flow-col gap-4">
                <Link href="https://github.com/orgs/BootTalk-Service/repositories">
                  <Github className="fill-current" />
                </Link>
                <Link href="https://www.notion.so/BootTalk-1dc063966d918014be9fee0a91c3f76b?pvs=4">
                  <NotebookIcon className="fill-current" />
                </Link>
              </div>
            </nav>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Footer;
