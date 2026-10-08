import {INDEX_SITE} from '../site-config';
import Portfolio from '../../components/Portfolio';
export const metadata={title:'Achievements',alternates:{canonical:'/achievements'},robots:{index:INDEX_SITE,follow:INDEX_SITE}};
export default function Page(){return <Portfolio view="achievements" portrait="/assets/portrait.jpg" resume="/assets/resume-public.pdf"/>}
