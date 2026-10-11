import {UserIcon} from '@sanity/icons/User'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {validateKebabSlug} from '../../lib/validators'

export const author = defineType({
  name: 'author',
  title: 'Auteur',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 60},
      validation: (rule) => rule.required().custom(validateKebabSlug),
    }),
    defineField({
      name: 'isDefault',
      title: 'Auteur par défaut',
      type: 'boolean',
      description: "Utilisé quand un article n'a pas d'auteur. Un seul auteur par défaut.",
      initialValue: false,
    }),
    defineField({
      name: 'jobTitle',
      title: 'Rôle / expertise',
      type: 'string',
      description: 'Ex : Street workout coach · renforce l’E-E-A-T.',
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Texte alternatif', type: 'string'})],
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'sameAs',
      title: 'Profils (Instagram, YouTube, site…)',
      type: 'array',
      description: 'Repris dans le schema Person (sameAs).',
      of: [defineArrayMember({type: 'url'})],
    }),
  ],
  preview: {select: {title: 'name', subtitle: 'jobTitle', media: 'image'}},
})
