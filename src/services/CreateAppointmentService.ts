import { startOfHour } from 'date-fns';

import Appointment from '../models/appointments';
import AppointmentRepository from '../repositories/appointmentsRepository';

interface Resquest {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentRepository;

  constructor(appointmentsRepository: AppointmentRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: Resquest): Appointment {
    const parsedDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      parsedDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('this appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
