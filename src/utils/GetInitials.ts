export function GetInitials(fullName: string) {
    if (!fullName) return '';
  
    const parts = fullName.trim().split(/\s+/);
    
    if (parts.length === 0) return '';
    
    const firstNameInitial = parts[0][0] || '';
    
    const lastNameInitial = parts.length > 1 ? parts[parts.length - 1][0] : '';
    
    return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
  }