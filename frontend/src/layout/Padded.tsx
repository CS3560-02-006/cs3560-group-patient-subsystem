type PaddedProps = {
    children: React.ReactNode;
} &  React.HTMLProps<HTMLDivElement>

const Padded = ({children, className, ...props}: PaddedProps) => {
    return <div className={className + " p-4 bg-blue-300 rounded-lg"} {...props}>{children}</div>
}

export default Padded;