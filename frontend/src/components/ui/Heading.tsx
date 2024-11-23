
interface HeadingProps {
    children: React.ReactNode
    variant: "primary" | "secondary" 
    className?: string
}

const variantStyles = {
    "primary" : "font-font1 font-semibold text-[2.5rem] md:text-[3.5rem] tracking-tight text-text ",
    "secondary": "text-[0.8rem] md:text-[1rem] lg:text-[1.2rem] mx-auto font-semibold text-border",
}

export const Heading: React.FC<HeadingProps> = (
    {
        children,
        variant,
        className
    }
) => {
    return(
        <h1 className={`${variantStyles[variant]} ${className}`}>
            {children}
        </h1>
    )


}