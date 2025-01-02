import Image from 'next/image';

import { BottomGradient } from '@/components/ui/bottom-gradient';
import { LabelInputContainer } from '@/components/ui/label-input-container';
import { Textarea } from '@/components/ui/textarea';
import { getServerSession } from '@/lib/auth/session/server';
import { getLinkedInBasicProfile } from '@/lib/linkedin/user/server';

import Author from './author';

export async function PostForm() {
    const profile = await getLinkedInBasicProfile(await getServerSession());

    return (
        <>
            <article className="mx-auto max-w-[555px] rounded-xl bg-[#1b1f23] px-4 py-3">
                <section className="mb-2 pr-9">
                    <Author profile={profile} />
                </section>
                <section className="text-sm">
                    <Textarea placeholder="Write your post here" />
                </section>
                <section className="mb-4 flex items-center gap-1 py-2">
                    <div className="flex">
                        <Image src="/like.svg" alt="Like" width={16} height={16} />
                        <Image className="-ml-1" src="/heart.svg" alt="Insight" width={16} height={16} />
                        <Image className="-ml-1" src="/insight.svg" alt="Heart" width={16} height={16} />
                    </div>
                    <div className="text-sm font-light text-linkedin-low-emphasis">You and 1830 others</div>
                </section>
                <section className="w-full pr-4">
                    <div className="mb-2 flex items-start justify-between">
                        <div className="max-w-[485px]"><Author profile={profile} size="sm" showTime={false} /></div>
                        <div className="flex items-center gap-2 text-xs font-light text-linkedin-low-emphasis">
                            <span>1s</span>
                            <span className="text-sm">•••</span>
                        </div>
                    </div>
                    <LabelInputContainer className="pl-9">
                        <Textarea id="comment" placeholder="📌 Your comment goes here" />
                    </LabelInputContainer>
                </section>

                <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

                <section>
                    <button
                        className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                    >
                        <strong>Schedule post to be #1</strong>
                        <BottomGradient />
                    </button>
                </section>
            </article>
            {/* <div className="mx-auto w-full max-w-md rounded-none bg-white p-4 shadow-input md:rounded-2xl md:p-8 dark:bg-black">
                <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                    Create and schedule your post
                </h2>

                <form className="my-8">
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" placeholder="••••••••" type="password" />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-8">
                        <Label htmlFor="twitterpassword">Your twitter password</Label>
                        <Input
                            id="twitterpassword"
                            placeholder="••••••••"
                            type="twitterpassword"
                        />
                    </LabelInputContainer>

                    <button
                        className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                    >
                        <strong>Schedule post to be #1</strong>
                        <BottomGradient />
                    </button>

                    <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
                </form>
            </div> */}
        </>
    );
}
