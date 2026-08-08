import type { Config } from 'tailwindcss'

/**
 * Tokens do redesign 2026 — ver reference/redesign/SPEC.md, seções 1 e 2.
 *
 * Regras que o Tailwind não consegue impor sozinho, mas que valem no código:
 *  · laranja nunca é cor de texto, só de fundo de ação e de detalhe
 *  · texto sobre laranja é `verde`, nunca branco (branco dá 2,87 e reprova)
 *  · o hover do botão laranja CLAREIA, porque o texto é escuro
 *  · o verde do WhatsApp #25D366 não existe mais no site
 *  · nenhuma seção usa preto puro
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        verde: {
          DEFAULT: '#1B3025',  // fundo padrão e seções escuras
          card:    '#2A4233',  // cards, faixas de CTA, slots de mídia
          linha:   '#334C3D',  // divisórias sobre escuro
          borda:   '#4E6A59',  // borda de botão secundário sobre escuro
          rodape:  '#152419',  // rodapé
          luz:     '#A9CDB2',  // TEXTO de destaque sobre fundo escuro
          medio:   '#2F5E4A',  // TEXTO de destaque sobre fundo claro
        },
        menta: {
          DEFAULT: '#FFFFFF',  // texto principal sobre escuro
          clara:   '#E3F3E6',  // fundo das seções claras
        },
        sol: {
          DEFAULT: '#E2762F',  // ACENTO ÚNICO: só ação e detalhe
          forte:   '#EC8B48',  // hover do acento (clareia, não escurece)
          fraco:   '#FFF6F1',  // fundo levíssimo de destaque
        },
        ceu: '#6E9FB0',

        // Nomes antigos, mantidos enquanto as páginas migram para os tokens
        // novos. Removê-los assim que a Fase 5 terminar.
        'g-dark':  '#1B3025',
        'g-mid':   '#4E7D57',
        'g-light': '#C1D5BD',
        'g-pale':  '#E3F3E6',
        s1: '#1B3025',
        s2: '#243D2D',
        s3: '#2D4E37',
        s4: '#345E3F',
      },
      textColor: {
        // Texto sobre fundo claro. `tinta-50` é intencionalmente igual ao
        // `tinta-70` no SPEC: a versão mais fraca reprovava no contraste.
        'tinta-70': 'rgba(27,48,37,.70)',
        'tinta-50': 'rgba(27,48,37,.70)',
        'menta-fraca': 'rgba(255,255,255,.62)',
      },
      borderColor: {
        'tinta-16': 'rgba(27,48,37,.16)',
      },
      fontFamily: {
        // Quanta só em título, número e rótulo caixa alta. Nunca em parágrafo:
        // a razão x-height/caixa-alta é 0,714 e o `o` é bem mais largo que o
        // `n`, o que cansa em texto corrido. SPEC seção 3.
        display: ['var(--font-quanta)', 'system-ui', 'sans-serif'],
        // `--font-body` é a indireção definida em globals.css. Hoje aponta para
        // Kohinoor; o commit do Satoshi troca só ela.
        sans:    ['var(--font-body)', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        conteudo: '1320px',
      },
      animation: {
        'marquee': 'marquee-scroll 28s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

export default config
