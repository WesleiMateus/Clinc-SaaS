import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ClinicForm from "./_components/form";

const ClinicFormPage = () => {
  return (
    <Dialog open>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Adiocionar Clínica</DialogTitle>
          <DialogDescription>
            Acidione uma clínica para continuar
          </DialogDescription>
          <ClinicForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ClinicFormPage;
