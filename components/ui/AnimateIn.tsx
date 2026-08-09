'use client'

import { motion } from 'framer-motion'

/**
 * ATENÇÃO ao `margin` do viewport.
 *
 * Um valor único encolhe os QUATRO lados da área de disparo. Elemento estreito
 * perto da borda esquerda no celular, com x menor que a margem, nunca cruza o
 * IntersectionObserver e trava em `opacity: 0`: some só no telefone, e o
 * desktop não mostra o problema.
 *
 * Por isso `'-60px 0px'`, que encolhe só na vertical. A armadilha já custou
 * uma seção invisível no mobile antes, e estava aqui, no componente que quase
 * toda seção do site usa.
 */

interface Props {
  children: React.ReactNode
  delay?: number
  className?: string
  y?: number
}

export function AnimateIn({ children, delay = 0, className, y = 22 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px 0px' }}
      transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
  },
}

interface StaggerProps {
  children: React.ReactNode
  className?: string
}

export function AnimateStagger({ children, className }: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={staggerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px 0px' }}
    >
      {children}
    </motion.div>
  )
}

export { itemVariants }
