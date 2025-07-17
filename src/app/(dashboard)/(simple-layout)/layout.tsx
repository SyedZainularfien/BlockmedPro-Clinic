import React, { PropsWithChildren } from 'react';

import SimpleLayout from '@/components/layouts/simple-layout';

const layout = ({ children }: PropsWithChildren) => {
  return <SimpleLayout>{children}</SimpleLayout>;
};

export default layout;
