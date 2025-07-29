import {notFound} from 'next/navigation';
import {locales} from '../../i18n';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Attendre les paramètres
  const {locale} = await params;
  
  // Valider que la locale est supportée
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return children;
} 