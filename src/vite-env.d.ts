declare module '*.png' {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly MODE: 'development' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
