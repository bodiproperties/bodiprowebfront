interface Props {
  text: string
  light?: boolean
}

export function SectionLabel({ text, light = false }: Props) {
  return (
    <p
      className={`text-xs tracking-[0.2em] mb-4 ${
        light ? 'text-[#F58220]' : 'text-[#F58220]'
      }`}
    >
      {text}
    </p>
  )
}
