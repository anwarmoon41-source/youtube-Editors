import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-8 py-3 font-orbitron font-bold tracking-wider uppercase transition-all duration-300 clip-path-cyberpunk relative overflow-hidden group";
  
  const variants = {
    primary: "bg-transparent border-2 border-cyan text-white hover:bg-cyan hover:text-black hover:shadow-neon-cyan",
    secondary: "bg-transparent border-2 border-magenta text-white hover:bg-magenta hover:text-black hover:shadow-neon-magenta",
    accent: "bg-transparent border-2 border-voltage text-white hover:bg-voltage hover:text-black hover:shadow-[0_0_15px_#FBFF00]",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;