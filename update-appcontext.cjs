const fs = require('fs');
let code = fs.readFileSync('src/context/AppContext.tsx', 'utf8');

const effect = `
  useEffect(() => {
    if (settings?.themeColor) {
      document.documentElement.style.setProperty('--theme-color', settings.themeColor);
    }
    if (settings?.faviconUrl) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link') as HTMLLinkElement;
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = settings.faviconUrl;
    }
    if (settings?.globalMetaTitle) {
      document.title = settings.globalMetaTitle;
    }

    // Tracking injection
    if (settings?.googleAnalyticsId || settings?.googleAdsId) {
      const existingScript = document.getElementById('google-tracking-script');
      if (existingScript) existingScript.remove();
      const existingConfig = document.getElementById('google-tracking-config');
      if (existingConfig) existingConfig.remove();

      const trackingId = settings.googleAnalyticsId || settings.googleAdsId;
      
      const script = document.createElement('script');
      script.id = 'google-tracking-script';
      script.async = true;
      script.src = \`https://www.googletagmanager.com/gtag/js?id=\${trackingId}\`;
      document.head.appendChild(script);

      const config = document.createElement('script');
      config.id = 'google-tracking-config';
      let configText = \`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date());\`;
      
      if (settings.googleAnalyticsId) {
        configText += \` gtag('config', '\${settings.googleAnalyticsId}');\`;
      }
      if (settings.googleAdsId) {
        configText += \` gtag('config', '\${settings.googleAdsId}');\`;
      }
      
      config.innerHTML = configText;
      document.head.appendChild(config);
    }

  }, [settings]);
`;

code = code.replace(
  /useEffect\(\(\) => \{[\s\S]*?document\.title = settings\.globalMetaTitle;\s*\}\s*\}, \[settings\]\);/,
  effect
);

// update waNumber
code = code.replace(
  "const waNumber = '6281234567890';",
  "const waNumber = '6287829609156';"
);

fs.writeFileSync('src/context/AppContext.tsx', code);
