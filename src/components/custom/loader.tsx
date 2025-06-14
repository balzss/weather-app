import { Loader2 } from 'lucide-react'

type LoaderProps = {
  text: string
}

export function Loader({ text }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
      <p className="mt-4 text-muted-foreground">{text}</p>
    </div>
  )
}
