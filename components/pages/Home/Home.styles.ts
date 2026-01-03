import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container: 'min-h-screen bg-transparent text-foreground',
    header: 'mx-auto w-full max-w-6xl px-6 pt-8',
    headerInner: 'flex items-center justify-between gap-6',
    brandWrap: 'flex items-center gap-3',
    brandMark: 'grid size-10 place-items-center rounded border-2 bg-primary shadow-md',
    brandTextWrap: 'leading-tight',
    nav: 'hidden items-center gap-6 md:flex',
    navLink: 'text-muted-foreground',

    main: 'mx-auto w-full max-w-6xl px-6 pb-16 pt-12',

    heroSection: 'grid gap-10 md:grid-cols-2 md:items-center',
    heroLeft: 'space-y-6',
    badgeRow: 'flex flex-wrap items-center gap-2',
    title: 'max-w-xl',
    subtitle: 'max-w-xl text-muted-foreground',
    cta: 'justify-center sm:w-auto',

    searchCard: 'w-full',
    searchContent: 'space-y-3',
    searchRow: 'flex flex-col gap-3 sm:flex-row',
    searchButton: 'justify-center sm:w-auto',
    helperText: 'text-sm text-muted-foreground',

    heroRight: 'grid gap-4',
    sideCard: 'w-full',
    list: 'grid gap-2',
    listItem: 'text-muted-foreground',

    howSection: 'mt-14 space-y-6',
    howHeader: 'flex items-end justify-between gap-6',
    howHeaderText: 'space-y-2',
    howSubtitle: 'text-muted-foreground',
    stepsGrid: 'grid gap-4 md:grid-cols-3',
    stepCard: 'w-full',

    teachersSection: 'mt-14 grid gap-4 md:grid-cols-[1.5fr_1fr]',
    teacherCard: 'w-full',
    teacherCTAContent: 'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between',
    teacherCTAText: 'text-muted-foreground',

    verifyCard: 'w-full',
    verifyContent: 'grid gap-2',
    verifyLine: 'text-muted-foreground',

    safetySection: 'mt-14',
    safetyCard: 'w-full',
    safetyGrid: 'grid gap-4 md:grid-cols-3',
    safetyBlock: 'space-y-2',
    safetyBlockText: 'text-muted-foreground',

    footer: 'mt-14 border-t-2 pt-8',
    footerInner: 'flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between',
    footerText: 'text-muted-foreground',
    footerLinks: 'flex items-center gap-4',
  },
});
