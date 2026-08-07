const fs = require('fs');

let appCtx = fs.readFileSync('src/context/AppContext.tsx', 'utf8');
appCtx = appCtx.replace(
  "let link = document.querySelector(\"link[rel~='icon']\");",
  "let link = document.querySelector(\"link[rel~='icon']\") as HTMLLinkElement;"
);
fs.writeFileSync('src/context/AppContext.tsx', appCtx);

let adminCode = fs.readFileSync('src/pages/AdminDashboardPage.tsx', 'utf8');
adminCode = adminCode.replace(
  "import { LogOut, LayoutDashboard, Plus, Car as CarIcon, Calendar, MapPin, Tag, Menu, X, Users, MessageCircle, BarChart3 } from 'lucide-react';",
  "import { LogOut, LayoutDashboard, Plus, Car as CarIcon, Calendar, MapPin, Tag, Menu, X, Users, MessageCircle, BarChart3, Settings } from 'lucide-react';"
);
fs.writeFileSync('src/pages/AdminDashboardPage.tsx', adminCode);
