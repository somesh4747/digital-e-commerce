import React from 'react'
import { Button } from './ui/button'

export default function Footer() {
    return (
        <footer className="h-[200px] flex-wrap mt-[100px] flex justify-between p-10 md:gap-0 gap-4 items-center bg-black/30 text-white">
            <div className="flex flex-col items-start">
                <Button variant={'link'} className="text-white p-0">
                    <a href="https://github.com/somesh4747/" target="_blank\">
                        {' '}
                        Github
                    </a>
                </Button>
                <Button variant={'link'} className="text-white p-0">
                    <a
                        href="https://www.linkedin.com/in/somesh-karmakar-a75328291"
                        target="_blank"
                    >
                        {' '}
                        Linkedin
                    </a>
                </Button>
                <Button variant={'link'} className="text-white p-0">
                    <a href="https://x.com/somesh_47" target="_blank">
                        {' '}
                        Twitter
                    </a>
                </Button>
                <div>Contact details &#169; somesh47.karmakar@gmail.com</div>
            </div>
            <div>
                <div className="capitalize">location - kolkata, 700102</div>
            </div>
        </footer>
    )
}
