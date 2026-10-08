import {INDEX_SITE,SITE_URL} from './site-config';
export default function sitemap(){return INDEX_SITE?['','/resume','/contact'].map(path=>({url:SITE_URL+path,changeFrequency:'monthly',priority:path?0.7:1})):[]}
