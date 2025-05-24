import { redirect } from 'next/navigation'

export default function Page() {
  redirect('/conversations');
  return null;
} 