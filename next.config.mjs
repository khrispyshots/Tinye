import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';
const nextConfig={reactStrictMode:true,experimental:{cpus:2}};
export default function configuration(phase){return {...nextConfig,distDir:phase===PHASE_DEVELOPMENT_SERVER?'.next-dev':'.next-build'};}
