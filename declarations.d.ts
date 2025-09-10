// declarations.d.ts

// For SVG files (React component)
declare module '*.svg' {
  import * as React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FunctionComponent<SvgProps>;
  export default content;
}

// For raster images (PNG, JPG, JPEG)
declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

declare module '*.jpeg' {
  const content: any;
  export default content;
}

// For react-native-html-to-pdf
declare module 'react-native-html-to-pdf' {
  interface RNHTMLtoPDFOptions {
    html: string;
    fileName?: string;
    directory?: string;
  }

  interface RNHTMLtoPDFResult {
    filePath: string;
  }

  const RNHTMLtoPDF: {
    convert(options: RNHTMLtoPDFOptions): Promise<RNHTMLtoPDFResult>;
  };

  export default RNHTMLtoPDF;
}
