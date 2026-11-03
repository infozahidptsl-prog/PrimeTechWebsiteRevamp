import React from 'react';
import { TypeIcon } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '../../components/admin/PageHeader';
import { ObjectForm } from '../../components/admin/ObjectForm';
import { sectionTextFields } from '../../data/adminSchema';
import { useContent } from '../../contexts/ContentContext';
import type { SectionTexts } from '../../types/content';

export function TextsPage() {
  const { content, updateSections } = useContent();
  return (
    <div>
      <PageHeader icon={TypeIcon} title="Page texts" description="Headings and labels for each homepage section, in the order they appear." />
      <div className="mt-8">
        <ObjectForm<SectionTexts>
          title="Section headings"
          description="Changes appear on the site as soon as you save."
          fields={sectionTextFields}
          value={content.sections}
          onSave={(v) => {
            updateSections(v);
            toast.success('Page texts saved');
          }} />
        
      </div>
    </div>);

}