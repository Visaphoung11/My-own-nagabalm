import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
  // Liste des locales supportées
  locales,
  
  // Locale par défaut
  defaultLocale: 'en',
  
  // Toujours inclure le préfixe locale dans l'URL pour la cohérence
  localePrefix: 'always',
  
  // Détection automatique de la locale basée sur Accept-Language header
  localeDetection: true
});

export const config = {
  // Matcher qui correspond à tous les chemins sauf ceux qui ne doivent pas être internationalisés
  matcher: [
    // Inclut tous les chemins sauf api, _next, _vercel, fichiers statiques
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // Inclut aussi la racine
    '/'
  ]
}; 