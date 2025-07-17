import { DocumentProps, PDFDownloadLink } from '@react-pdf/renderer';

import { Button } from '@/components/shared/button';

export const downloadPDF = (document: React.ReactElement<DocumentProps>, fileName: string) => {
  return (
    <PDFDownloadLink document={document} fileName={`${fileName}.pdf`} className="w-full sm:w-fit">
      {({ loading }) => (
        <Button className="w-full sm:w-fit">{loading ? 'Preparing document...' : 'Download Invoice'}</Button>
      )}
    </PDFDownloadLink>
  );
};
