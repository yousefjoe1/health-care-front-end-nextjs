import { NextResponse, NextRequest } from 'next/server'
import { checkToken } from './app/(dashboard)/_actions/checkToken'

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    const isAuth = await checkToken()
    console.log("🚀 ~ proxy ~ isAuth:", isAuth)

    if (!isAuth.success) {
        return NextResponse.redirect(new URL('/admin-login', request.url))
    }

    return NextResponse.next()


}

export const config = {
    matcher: ['/admin/:path*']
}