'use client';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  type = 'button',
  className = ''
}: ButtonProps) {
  const baseClasses = 'font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#e8b900] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg hover:shadow-xl !rounded-button';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#e8b900] to-[#c29a00] text-white hover:from-[#c29a00] hover:to-[#a17800] hover:shadow-[#e8b900]/25',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 font-medium',
    outline: 'border-2 border-[#e8b900] text-[#e8b900] hover:bg-[#e8b900] hover:text-white font-medium'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
}
