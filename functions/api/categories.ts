import {redirect} from '../utils/proxy';

export async function onRequest(context: any) {
    return redirect(context, "https://services.outsideworx.net/api/soupart")
}