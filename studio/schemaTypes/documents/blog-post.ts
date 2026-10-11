import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {HelpCircleIcon} from '@sanity/icons/HelpCircle'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {lengthRange, validateKebabSlug, validateNoInvisibleUnicode} from '../../lib/validators'

// Mirrors src/lib/skills.ts on the website.
const SKILLS = [
  {title: 'L-sit', value: 'l-sit'},
  {title: 'Handstand', value: 'handstand'},
  {title: 'Muscle-up', value: 'muscle-up'},
  {title: 'Back lever', value: 'back-lever'},
  {title: 'Front lever', value: 'front-lever'},
  {title: 'Planche', value: 'planche'},
]

/**
 * Blog article — 5 groups:
 * SEO, Schema.org, Header (H1 · author · intro · takeaways),
 * Body, Footer (FAQ · conclusion · CTA · sources · related content).
 *
 * Articles are mostly written by the content generator through the API, which skips Studio
 * validation: SEO rules are warnings, and the website falls back on sensible defaults.
 * Long-form text is Markdown so the generator can send its output as-is.
 */
export const blogPost = defineType({
  name: 'blogPost',
  title: 'Article de blog',
  type: 'document',
  icon: DocumentTextIcon,
  validation: (rule) => rule.custom(validateNoInvisibleUnicode).warning(),
  groups: [
    {name: 'seo', title: '1. Métadonnées SEO', default: true},
    {name: 'schema', title: '2. Données structurées'},
    {name: 'header', title: '3. En-tête'},
    {name: 'content', title: "4. Corps de l'article"},
    {name: 'footer', title: "5. Bas d'article"},
  ],
  initialValue: async (_params, {getClient}) => {
    const authorId = await getClient({apiVersion: '2026-10-11'}).fetch<string | null>(
      `*[_type == "author" && isDefault == true][0]._id`,
    )
    return {
      publishedAt: new Date().toISOString().slice(0, 10),
      ...(authorId && {author: {_type: 'reference', _ref: authorId}}),
    }
  },
  fields: [
    // ——— 1. MÉTADONNÉES SEO ———
    defineField({
      name: 'metaTitle',
      title: 'Balise Title',
      type: 'string',
      group: 'seo',
      description: '55–65 caractères. Le suffixe « | StreetBarLab » est ajouté automatiquement.',
      validation: (rule) => [rule.required(), rule.custom(lengthRange(45, 65)).warning()],
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      group: 'seo',
      description: '140–160 caractères. Bénéfice + CTA implicite.',
      validation: (rule) => [rule.required(), rule.custom(lengthRange(140, 160)).warning()],
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'seo',
      description: 'Sans stop words, en kebab-case. URL : /blog/[slug]',
      options: {source: (doc) => (doc.metaTitle || doc.h1) as string, maxLength: 80},
      validation: (rule) => rule.required().custom(validateKebabSlug),
    }),
    defineField({
      name: 'keywordPrimary',
      title: 'Mot-clé principal',
      type: 'string',
      group: 'seo',
      description: 'Usage interne (suivi SEO). Ex : first pull up',
    }),
    defineField({
      name: 'keywordsSecondary',
      title: 'Mots-clés secondaires',
      type: 'array',
      group: 'seo',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      group: 'seo',
      description: 'Texte libre, ex : Beginner. Sert à regrouper les articles.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'seo',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Image mise en avant',
      type: 'image',
      group: 'seo',
      description:
        'Image Open Graph et vignette. 1200×630 px. Sans image, une image est générée automatiquement.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif (alt)',
          type: 'string',
          description: 'Doit contenir le mot-clé principal naturellement.',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'URL canonique (optionnel)',
      type: 'url',
      group: 'seo',
      description:
        "Uniquement si l'article est republié depuis une autre URL. Sinon, laisser vide.",
    }),
    defineField({
      name: 'noIndex',
      title: 'Ne pas indexer (noindex)',
      type: 'boolean',
      group: 'seo',
      description: 'Cache l’article de Google et du sitemap.',
      initialValue: false,
    }),

    // ——— 2. DONNÉES STRUCTURÉES ———
    defineField({
      name: 'schemaType',
      title: 'Type principal Schema.org',
      type: 'string',
      group: 'schema',
      options: {
        list: [
          {title: 'BlogPosting', value: 'BlogPosting'},
          {title: 'Article', value: 'Article'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'BlogPosting',
    }),
    defineField({
      name: 'structuredDataJsonLd',
      title: 'JSON-LD personnalisé (optionnel)',
      type: 'text',
      rows: 16,
      group: 'schema',
      description:
        'Objet JSON ou <script type="application/ld+json">…</script>. S’il est rempli, il remplace entièrement le JSON-LD automatique (article, fil d’Ariane, FAQ). Vide = généré par le site.',
      validation: (rule) =>
        rule.custom((value: string | undefined) => {
          if (!value?.trim()) return true
          const json = value.replace(/<\/?script[^>]*>/gi, '').trim()
          try {
            JSON.parse(json)
            return true
          } catch {
            return 'JSON invalide.'
          }
        }),
    }),

    // ——— 3. EN-TÊTE ———
    defineField({
      name: 'h1',
      title: 'H1 — Titre principal',
      type: 'string',
      group: 'header',
      description: 'Mot-clé dans les 6 premiers mots. Différent de la balise Title.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'reference',
      group: 'header',
      to: [{type: 'author'}],
      description: "Vide = auteur par défaut. Nom réel · renforce l'E-E-A-T.",
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'date',
      group: 'header',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Date de mise à jour',
      type: 'date',
      group: 'header',
      description: 'Google favorise les contenus maintenus à jour.',
      validation: (rule) =>
        rule.custom((updatedAt: string | undefined, {document}) => {
          const publishedAt = document?.publishedAt as string | undefined
          if (updatedAt && publishedAt && updatedAt < publishedAt) {
            return 'Doit être postérieure à la date de publication.'
          }
          return true
        }),
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction (Markdown)',
      type: 'text',
      rows: 6,
      group: 'header',
      description:
        '100–150 mots. Mot-clé dans les 100 premiers mots. Aller droit au problème du lecteur.',
    }),
    defineField({
      name: 'keyTakeaways',
      title: 'Key Takeaways — À retenir',
      type: 'array',
      group: 'header',
      description: '3 à 5 points clés. Souvent repris en snippet Google.',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.min(3).max(5).warning(),
    }),

    // ——— 4. CORPS DE L'ARTICLE ———
    defineField({
      name: 'body',
      title: 'Contenu (Markdown)',
      type: 'text',
      rows: 30,
      group: 'content',
      description:
        'Markdown : ## H2, ### H3, listes, **gras**, [liens](/skills/muscle-up), tableaux, ![alt](url). Jamais de H1 (#).',
      validation: (rule) => [
        rule.required(),
        rule
          .custom((md: string | undefined) =>
            md && /^# /m.test(md)
              ? 'Pas de H1 (#) dans le contenu : le H1 est un champ séparé.'
              : true,
          )
          .warning(),
      ],
    }),

    // ——— 5. BAS D'ARTICLE ———
    defineField({
      name: 'faq',
      title: 'FAQ — Questions fréquentes',
      type: 'array',
      group: 'footer',
      description: 'Active le schema FAQPage. 2 à 6 questions.',
      of: [
        defineArrayMember({
          name: 'faqItem',
          type: 'object',
          icon: HelpCircleIcon,
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Réponse',
              type: 'text',
              rows: 4,
              description: '60–100 mots. Répondre directement dès la première phrase.',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'question', subtitle: 'answer'}},
        }),
      ],
      validation: (rule) => rule.min(2).max(6).warning(),
    }),
    defineField({
      name: 'conclusion',
      title: 'Conclusion (Markdown)',
      type: 'text',
      rows: 6,
      group: 'footer',
      description: 'Synthèse de valeur. 1 seul CTA principal.',
    }),
    defineField({
      name: 'cta',
      title: 'CTA final',
      type: 'object',
      group: 'footer',
      description: 'Vide = CTA par défaut vers le générateur de programme.',
      fields: [
        defineField({name: 'text', title: 'Texte au-dessus du bouton', type: 'text', rows: 2}),
        defineField({name: 'buttonLabel', title: 'Libellé du bouton', type: 'string'}),
        defineField({
          name: 'href',
          title: 'Lien',
          type: 'url',
          description: 'Ex : /program-generator, /level-test, /skills/muscle-up',
          validation: (rule) => rule.uri({allowRelative: true, scheme: ['http', 'https']}),
        }),
      ],
    }),
    defineField({
      name: 'sources',
      title: 'Sources',
      type: 'array',
      group: 'footer',
      description: "Si l'article cite des stats ou études. Sources de référence uniquement.",
      of: [
        defineArrayMember({
          name: 'source',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Libellé',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'label', subtitle: 'url'}},
        }),
      ],
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Articles recommandés',
      type: 'array',
      group: 'footer',
      description: '3 articles proches. Vide = articles de la même catégorie.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'blogPost'}]})],
      validation: (rule) => rule.max(3).unique(),
    }),
    defineField({
      name: 'relatedSkills',
      title: 'Skills liés',
      type: 'array',
      group: 'footer',
      description: 'Liens vers les pages /skills/… du site (maillage interne).',
      of: [defineArrayMember({type: 'string'})],
      options: {list: SKILLS},
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'externalId',
      title: 'ID externe (générateur)',
      type: 'string',
      group: 'seo',
      readOnly: true,
      description: "Identifiant de l'article dans l'outil de génération. Rempli par l'API.",
    }),
  ],
  orderings: [
    {
      title: 'Date de publication (récent)',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'h1',
      metaTitle: 'metaTitle',
      slug: 'slug.current',
      date: 'publishedAt',
      media: 'featuredImage',
    },
    prepare: ({title, metaTitle, slug, date, media}) => ({
      title: title || metaTitle || 'Article sans titre',
      subtitle: [date, slug && `/blog/${slug}`].filter(Boolean).join(' · '),
      media,
    }),
  },
})
