import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import '../AlertStyle.css';

const AlertDialogDemo = ({onConfirm}) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <button className="btn-delete">حذف</button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="AlertDialogOverlay" />
      <AlertDialog.Content className="AlertDialogContent">
        <AlertDialog.Title className="AlertDialogTitle">هل أنت متأكد أنك تريد حذف هذا العنصر؟?</AlertDialog.Title>
        {/* <AlertDialog.Description className="AlertDialogDescription">
          This action cannot be undone. This will permanently delete your account and remove your
          data from our servers.
        </AlertDialog.Description> */}
        <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
          <AlertDialog.Cancel asChild>
            <button className="Button mauve">الغــاء</button>
          </AlertDialog.Cancel>
          <AlertDialog.Action onClick={onConfirm} asChild>
            <button className="Button red">نعم , أريد </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default AlertDialogDemo;